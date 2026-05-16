import { describe, expect, it } from "bun:test"
import { Schema } from "effect"
import { SystemHealthResponse } from "./schemas"

describe("API response schemas", () => {
  it("decodes health responses to plain serializable DTOs", () => {
    const decoded = Schema.decodeUnknownSync(SystemHealthResponse)({
      environment: "development",
      service: "margin-api",
      status: "ok",
      timestamp: "2026-05-16T00:00:00.000Z",
      version: "0.0.1",
    })

    expect(Object.getPrototypeOf(decoded)).toBe(Object.prototype)
    expect(JSON.parse(JSON.stringify(decoded))).toEqual(decoded)
  })
})
