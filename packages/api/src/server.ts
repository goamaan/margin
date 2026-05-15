import { HealthService } from "@margin/application"
import { Effect } from "effect"
import { Hono } from "hono"
import { cors } from "hono/cors"

export interface MarginApiAppOptions {
  readonly runtime: {
    runPromise<A, E>(effect: Effect.Effect<A, E, HealthService>): Promise<A>
  }
}

export function createMarginApiApp(options: MarginApiAppOptions): Hono {
  const app = new Hono()

  app.use(
    "/v1/*",
    cors({
      allowHeaders: ["authorization", "content-type", "x-margin-tenant"],
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  )

  app.get("/v1/system/health", async (context) => {
    const health = await options.runtime.runPromise(
      HealthService.use((service) => service.getHealth)
    )

    return context.json(health)
  })

  app.notFound((context) =>
    context.json(
      {
        code: "not_found",
        message: "Route not found",
      },
      404
    )
  )

  app.onError((error, context) =>
    Effect.runSync(
      Effect.logError("Unhandled API error", error).pipe(
        Effect.as(
          context.json(
            {
              code: "internal_server_error",
              message: "Internal server error",
            },
            500
          )
        )
      )
    )
  )

  return app
}
