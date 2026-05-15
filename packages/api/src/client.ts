import { Effect, Schema } from "effect"

import { SystemHealthResponse } from "./schemas"

export interface LanternApiClientOptions {
  readonly baseUrl: string
  readonly fetch?: typeof fetch
  readonly timeoutMs?: number
}

export class ApiClientError extends Schema.TaggedErrorClass<ApiClientError>()("ApiClientError", {
  cause: Schema.optional(Schema.Defect),
  message: Schema.String,
  status: Schema.optional(Schema.Number),
}) {}

export interface LanternApiClient {
  readonly getSystemHealth: Effect.Effect<SystemHealthResponse, ApiClientError>
}

export function createLanternApiClient(options: LanternApiClientOptions): LanternApiClient {
  const fetchImpl = options.fetch ?? fetch
  const baseUrl = options.baseUrl.replace(/\/$/, "")
  const timeoutMs = options.timeoutMs ?? 5_000

  const getSystemHealth = Effect.fn("LanternApiClient.getSystemHealth")(function*() {
    const response = yield* Effect.tryPromise({
      try: () => {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), timeoutMs)

        return fetchImpl(`${baseUrl}/v1/system/health`, {
          headers: {
            accept: "application/json",
          },
          signal: controller.signal,
        }).finally(() => clearTimeout(timeout))
      },
      catch: (cause) =>
        new ApiClientError({
          cause,
          message: "Unable to reach Lantern API",
        }),
    })

    if (!response.ok) {
      return yield* new ApiClientError({
        message: `Lantern API returned ${response.status}`,
        status: response.status,
      })
    }

    const body = yield* Effect.tryPromise({
      try: () => response.json(),
      catch: (cause) =>
        new ApiClientError({
          cause,
          message: "Lantern API returned invalid JSON",
          status: response.status,
        }),
    })

    return yield* Effect.try({
      try: () => Schema.decodeUnknownSync(SystemHealthResponse)(body),
      catch: (cause) =>
        new ApiClientError({
          cause,
          message: "Lantern API returned an invalid health response",
          status: response.status,
        }),
    })
  })

  return {
    getSystemHealth: getSystemHealth(),
  }
}
