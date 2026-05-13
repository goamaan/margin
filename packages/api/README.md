# @lantern/api

Schema-first HTTP API boundary.

Owns durable API contracts, endpoint schemas, middleware contracts, OpenAPI documentation hooks, and handlers that call `@lantern/application`.

The web app should prefer TanStack Start server functions for first-party BFF flows. Use this package for public APIs, integrations, mobile clients, webhooks, and future standalone API deployment.
