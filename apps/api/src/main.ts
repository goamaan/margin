import { createLanternApiApp } from "@lantern/api/server"
import { makeLanternRuntime } from "@lantern/runtime"

const port = Number(Bun.env.PORT ?? 4000)
const runtime = makeLanternRuntime()
const app = createLanternApiApp({ runtime })

const server = Bun.serve({
  port,
  fetch: app.fetch,
})

console.info(`Lantern API listening on http://${server.hostname}:${server.port}`)

const shutdown = () => {
  void runtime.dispose()
  server.stop(true)
}

process.once("SIGINT", shutdown)
process.once("SIGTERM", shutdown)
