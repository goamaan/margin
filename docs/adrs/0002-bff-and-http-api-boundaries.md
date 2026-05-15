# ADR 0002: Canonical HTTP API Boundary

Status: accepted.  
Date: 2026-05-13.

## Context

TanStack Start supports server functions and server routes. Lantern also needs durable backend boundaries for compliance, auditability, tenant isolation, external tools, standards, mobile clients, and possible standalone services.

## Decision

Use `apps/api` as Lantern's canonical HTTP API runtime from the beginning. Use `packages/api` for API schemas, typed client helpers, and server adapters. The web app should consume this API path rather than private server functions for core LMS workflows.

API handlers call Effect application services through the runtime layer. TanStack Start server functions are reserved for UI-only or SSR-specific concerns and must not own LMS business logic.

## Consequences

The web app exercises the same path that future mobile clients, LTI/SIS integrations, and public API consumers will use. Auth, tenant checks, audit, policy, and observability can be centralized earlier.

The tradeoff is slightly more setup in development because `apps/web` and `apps/api` run as separate processes.
