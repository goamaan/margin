# ADR 0001: Effect-First Monorepo

Status: accepted.  
Date: 2026-05-13.

## Context

Lantern needs strong boundaries for permissions, auditability, AI governance, evals, integrations, and future deployment modes. A single app folder would be fast initially but would encourage framework-bound business logic.

## Decision

Use a Bun workspace monorepo. TanStack Start powers the web BFF. Effect powers the application core through packages for domain, application services, runtime composition, infrastructure adapters, AI, API, evals, integrations, fixtures, and testing.

## Consequences

Agents get clear places to put code. The frontend can move quickly without owning domain truth. Future workers, public APIs, and private-cloud deployments can reuse the same Effect services.

The tradeoff is more initial structure. Keep packages thin until real vertical slices justify deeper abstractions.
