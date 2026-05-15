import { createFileRoute } from "@tanstack/react-router"
import { createMarginApiClient } from "@margin/api/client"
import { Button } from "@workspace/ui/components/button"
import { Effect } from "effect"

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    const api = createMarginApiClient({
      baseUrl: import.meta.env.VITE_MARGIN_API_URL ?? "http://localhost:4000",
    })

    return Effect.runPromise(
      api.getSystemHealth.pipe(
        Effect.match({
          onFailure: (error) => ({
            api: {
              ok: false as const,
              message: error.message,
            },
          }),
          onSuccess: (health) => ({
            api: {
              ok: true as const,
              health,
            },
          }),
        })
      )
    )
  },
})

function App() {
  const { api } = Route.useLoaderData()

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Margin foundation ready</h1>
          <p>TanStack Start is rendering the web app.</p>
          <p>
            The web app is using the canonical Margin API path:{" "}
            {api.ok ? `${api.health.service} ${api.health.status}` : api.message}
          </p>
          <Button className="mt-2">Button</Button>
        </div>
      </div>
    </div>
  )
}
