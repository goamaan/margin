# RFC 0001: Technical Foundation

Status: accepted initial direction.  
Date: 2026-05-13.

## Problem

Lantern needs a foundation that can support a serious LMS over multiple months: multi-tenant records, permissions, audit logs, AI governance, evals, integrations, and a modern UI. The architecture should be slightly future-proof without forcing premature distributed systems.

## Decision

Use a Bun workspace monorepo with TanStack Start for `apps/web`, shadcn/ui in `packages/ui`, and Effect-first backend/application packages under `packages/*`.

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

## BFF vs HTTP API

`apps/web` is the first-party BFF. It should use TanStack Start server functions and server routes where appropriate, but it should not contain domain logic.

`packages/api` is reserved for schema-first HTTP API definitions and handlers. It exists so the same application services can later be exposed to integrations, mobile clients, public APIs, or a standalone API app without rewriting the backend.

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
- server function handlers

React components render UI. They should not accumulate LMS business logic.

## Non-Goals

- No database selection yet.
- No auth provider selection yet.
- No public REST contract yet.
- No AI provider selection yet.
- No worker or standalone API runtime yet.

## Consequences

This creates more packages than a tiny prototype needs, but it gives agents clear ownership boundaries and keeps future API/worker/private-cloud options open.
