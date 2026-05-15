# RFC 0001: Technical Foundation

Status: accepted initial direction.  
Date: 2026-05-13.

## Problem

Lantern needs a foundation that can support a serious LMS over multiple months: multi-tenant records, permissions, audit logs, AI governance, evals, integrations, and a modern UI. The architecture should be slightly future-proof without forcing premature distributed systems.

## Decision

Use a Bun workspace monorepo with TanStack Start for `apps/web`, a canonical backend API in `apps/api`, shadcn/ui in `packages/ui`, and Effect-first backend/application packages under `packages/*`.

The initial package boundaries are:

- `@lantern/domain`
- `@lantern/application`
- `@lantern/runtime`
- `@lantern/db`
- `@lantern/ai`
- `@lantern/api`
- `@lantern/evals`
- `@lantern/integrations`
- `@lantern/fixtures`
- `@lantern/testing`
- `@workspace/ui`

## Web and HTTP API

`apps/web` renders the first-party web experience and consumes Lantern through the shared API client. It should not contain domain logic and should not bypass the backend API for core LMS workflows.

`apps/api` is the canonical HTTP API runtime. `packages/api` owns response schemas, typed client helpers, and server adapters. This gives the web app, future mobile clients, LTI/SIS integrations, and external consumers one enforceable backend path.

## Effect Rules

All meaningful application behavior should be represented as Effect programs and services:

- domain commands and queries
- permissions
- audit/event emission
- AI orchestration
- evals
- imports/exports
- integrations
- persistence adapters
- background jobs
- API handlers
- route loaders that call the API client

React components render UI. They should not accumulate LMS business logic.

## Non-Goals

- No database selection yet.
- No auth provider selection yet.
- No full public REST contract yet beyond `/v1/system/health`.
- No AI provider selection yet.
- No worker or standalone API runtime yet.

## Consequences

This creates more packages than a tiny prototype needs, but it gives agents clear ownership boundaries, keeps compliance controls centralized, and avoids having to migrate the web app off private server functions later.
