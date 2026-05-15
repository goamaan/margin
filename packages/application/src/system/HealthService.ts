import { Context, Effect, Layer } from "effect"

export interface SystemHealth {
  readonly status: "ok"
  readonly service: "margin-api"
  readonly version: string
  readonly environment: string
  readonly timestamp: string
}

export class HealthService extends Context.Service<HealthService, {
  readonly getHealth: Effect.Effect<SystemHealth>
}>()("margin/application/HealthService") {
  static readonly layer = Layer.succeed(
    HealthService,
    HealthService.of({
      getHealth: Effect.sync(() => ({
        status: "ok",
        service: "margin-api",
        version: "0.0.1",
        environment: "development",
        timestamp: new Date().toISOString(),
      })),
    })
  )
}
