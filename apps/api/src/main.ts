import { createMarginApiApp } from "@margin/api/server"
import { makeMarginRuntime } from "@margin/runtime"

const port = Number(Bun.env.PORT ?? 4000)
const runtime = makeMarginRuntime()
const app = createMarginApiApp({ runtime })

const server = Bun.serve({
  port,
  fetch: app.fetch,
})

console.info(`Margin API listening on http://${server.hostname}:${server.port}`)

const shutdown = () => {
  void runtime.dispose()
  server.stop(true)
}

process.once("SIGINT", shutdown)
process.once("SIGTERM", shutdown)
