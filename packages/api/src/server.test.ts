import { describe, expect, it } from "bun:test"
import { HealthService } from "@margin/application"
import { Effect, Schema } from "effect"
import { createMarginApiApp } from "./server"
import { ApiErrorResponse, SystemHealthResponse } from "./schemas"

const testHealth = {
  environment: "test",
  service: "margin-api",
  status: "ok",
  timestamp: "2026-05-16T00:00:00.000Z",
  version: "0.0.1",
} as const

const testHealthService = HealthService.of({
  getHealth: Effect.succeed(testHealth),
})

const runtime = {
  runPromise: <A>(effect: Effect.Effect<A, never, HealthService>) =>
    Effect.runPromise(
      effect.pipe(Effect.provideService(HealthService, testHealthService))
    ),
}

describe("Margin API app", () => {
  it("serves schema-valid system health over the canonical HTTP path", async () => {
    const app = createMarginApiApp({ runtime })
    const response = await app.fetch(
      new Request("http://localhost/v1/system/health")
    )

    expect(response.status).toBe(200)
    expect(
      Schema.decodeUnknownSync(SystemHealthResponse)(await response.json())
    ).toEqual(testHealth)
  })

  it("serves schema-valid API errors", async () => {
    const app = createMarginApiApp({ runtime })
    const response = await app.fetch(new Request("http://localhost/unknown"))

    expect(response.status).toBe(404)
    expect(
      Schema.decodeUnknownSync(ApiErrorResponse)(await response.json())
    ).toEqual({
      code: "not_found",
      message: "Route not found",
    })
  })
})
