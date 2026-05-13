# ADR 0002: BFF and HTTP API Boundaries

Status: accepted.  
Date: 2026-05-13.

## Context

TanStack Start supports server functions and server routes. Lantern also needs future interoperability with external tools, standards, mobile clients, and possible standalone services.

## Decision

Use TanStack Start as the first-party BFF for the web app. Use `packages/api` for schema-first HTTP API contracts and handlers when an external or durable HTTP boundary is needed.

Server functions should call Effect application services through the runtime layer. Public HTTP routes should call the same services. Neither should contain core LMS business logic.

## Consequences

The web app can use type-safe first-party server functions without prematurely committing every interaction to REST. We still reserve a clean API path for LTI, SIS, mobile, external integrations, and later deployment splits.
