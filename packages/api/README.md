# @margin/api

Canonical HTTP API contract, client, and server adapter.

Owns durable API contracts, endpoint schemas, client helpers, middleware contracts, OpenAPI documentation hooks, and handlers that call `@margin/application`.

The web app should consume this package's client against `apps/api`, the same path future mobile apps, integrations, and external clients will use.

TanStack Start can still handle SSR and route-level UI, but it should not bypass this API for core LMS workflows.
