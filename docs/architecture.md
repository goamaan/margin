# Lantern Architecture

Lantern is an Effect-first, AI-governed learning management system.

Lantern uses a canonical backend API from the beginning. The web app owns routing, SSR, and UI composition, but it consumes the same HTTP API path that future mobile apps, integrations, and external clients will use. Business behavior lives in Effect packages and is exposed through the API layer, not through private framework shortcuts.

## Runtime Shape

```txt
apps/web
  TanStack Start app, SSR, route-level UX, API client consumer

apps/api
  Canonical HTTP API runtime

packages/ui
  shadcn-owned design system components

packages/domain
  schemas, value objects, domain errors, invariants, permissions vocabulary

packages/application
  Effect use cases, command/query services, policy orchestration, ports

packages/runtime
  Effect layer composition and ManagedRuntime bridges for apps

packages/db
  persistence adapters, migrations, repository implementations

packages/ai
  AI primitives, provider interfaces, retrieval contracts, policy checks

packages/api
  HTTP API schemas, typed client, and server adapter

packages/integrations
  LTI, OneRoster, SSO, SIS, SCORM/xAPI/cmi5 adapters

packages/evals
  eval harnesses, scoring, regression metadata

packages/fixtures
  synthetic institutions, courses, users, submissions, and edge cases

packages/testing
  shared test layers, clocks, fixtures, and assertions
```

## API Boundary

The frontend should call `apps/api` through the shared client in `packages/api`. This keeps first-party web behavior on the same path as mobile clients, standards integrations, webhooks, and external APIs.

TanStack Start server functions are still available for UI-only or SSR-specific concerns, but they should not bypass the canonical API for core LMS workflows. Anything that touches education records, tenant state, permissions, AI policy, audit logs, integrations, or admin controls belongs behind the API/application/runtime path.

## Backend Layers

Lantern has backend layers, not one backend bucket:

- Domain: pure, framework-independent LMS concepts and invariants.
- Application: permissioned use cases and workflows.
- Runtime: live/test layer composition.
- Infrastructure: database, AI providers, integration adapters, observability, queues.
- Edge apps: TanStack Start web app, canonical API app, workers later.

AI is not a separate product bolted onto the side. It is a package boundary and service family used by application workflows under policy, provenance, eval, and audit controls.
