# Lantern Web

TanStack Start app for the Lantern first-party web experience.

This app is the BFF and rendering edge. Keep LMS business rules in `packages/application` and `packages/domain`, then call them through `packages/runtime` from server functions or server routes.

Use `packages/api` only when the route is a durable HTTP boundary for external clients, standards integrations, or future standalone API deployment.
