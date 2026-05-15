# Lantern Web

TanStack Start app for the Lantern first-party web experience.

This app owns rendering, routing, SSR, and route-level UX. It consumes Lantern through the shared API client in `@lantern/api`, against the canonical API served by `apps/api`.

Do not put core LMS workflows behind private TanStack Start server functions. Anything that touches education records, tenants, permissions, AI policy, audit logs, integrations, or admin controls belongs behind `apps/api`.
