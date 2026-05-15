# Margin Agent Instructions

## Project Posture

Margin is a clean-room, AI-first learning management system. Do not copy source code, migrations, UI text, fixtures, icons, screenshots, or implementation structure from Canvas, Moodle, Blackboard, Brightspace, Cal.com, or any other third-party product.

Build original code from first principles while using public behavior, public standards, official documentation, and vendored reference source as learning material.

## Effect-First Rule

Margin application code should be Effect-first. Use Effect for domain workflows, services, dependency injection, typed errors, schemas, async orchestration, retries, interruption, observability, tests, and AI/eval pipelines.

Avoid writing ad hoc promise/error plumbing where an Effect pattern is available. Prefer small, composable Effect services and typed domain errors over broad imperative modules.

React UI can stay idiomatic React, but business logic, server work, AI workflows, integrations, and background jobs should use Effect.

## Vendored Repositories

This project vendors external repositories under `repos/`.

- Use vendored repositories as read-only reference material when working with related libraries.
- Prefer examples and patterns from vendored source code over generated guesses or web search results.
- Do not edit files under `repos/` unless explicitly asked.
- Do not import from `repos/`; application code should import normal package dependencies.

When writing Effect code, inspect `repos/effect/` for idiomatic usage, tests, module structure, and API design. Treat it as the local source of truth for Effect patterns.

If `repos/effect/LLMS.md` exists, read it before writing Effect code.

## Margin Feature Standard

For each feature or vertical slice:

- Update the relevant private or public planning docs.
- Identify domain objects, permissions, privacy risks, and audit events.
- Add tests for domain invariants, permissions, and user-visible behavior.
- Add evals for AI behavior.
- Use synthetic fixtures, never real student data.
- Keep AI actions human-reviewable for high-impact workflows.
