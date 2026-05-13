# Lantern Architecture

Lantern is an Effect-first, AI-governed learning management system.

The web app is a TanStack Start BFF: it owns routing, SSR, route loaders, server functions, and UI composition. It should not own LMS business rules. Business behavior lives in Effect packages that can also be reused later by workers, public APIs, import jobs, eval runners, and private-cloud deployments.

## Runtime Shape

```txt
apps/web
  TanStack Start app, BFF, SSR, server functions, route-level UX

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
  schema-first HTTP API definitions and handlers for public/integration clients

packages/integrations
  LTI, OneRoster, SSO, SIS, SCORM/xAPI/cmi5 adapters

packages/evals
  eval harnesses, scoring, regression metadata

packages/fixtures
  synthetic institutions, courses, users, submissions, and edge cases

packages/testing
  shared test layers, clocks, fixtures, and assertions
```

## BFF and API Boundary

The frontend should call TanStack Start server functions for first-party app flows. Those server functions should immediately enter the Effect runtime and call application services.

Lantern will also keep a separate `packages/api` boundary for schema-first HTTP APIs. This is for external clients, standards integrations, future mobile clients, and possible standalone API deployment. Do not duplicate business logic in route handlers or REST controllers.

## Backend Layers

Lantern has backend layers, not one backend bucket:

- Domain: pure, framework-independent LMS concepts and invariants.
- Application: permissioned use cases and workflows.
- Runtime: live/test layer composition.
- Infrastructure: database, AI providers, integration adapters, observability, queues.
- Edge apps: TanStack Start BFF today; workers and API apps later.

AI is not a separate product bolted onto the side. It is a package boundary and service family used by application workflows under policy, provenance, eval, and audit controls.
