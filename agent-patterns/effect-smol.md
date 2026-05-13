# Effect Agent Patterns for Lantern

Status: agent reference.  
Source of truth: `repos/effect/`.

Before writing Lantern Effect code:

1. Read `repos/effect/LLMS.md`.
2. Check `repos/effect/ai-docs/src/` for a close example.
3. Check `repos/effect/.patterns/` for library and testing rules.
4. Use `repos/effect/packages/effect/test/` when unsure about exact API behavior.

## Core Style

- Prefer `Effect.gen` for inline effect composition.
- Prefer `Effect.fn("functionName")` for reusable functions that return an Effect.
- Do not create exported functions that return a raw `Effect.gen`; wrap them in `Effect.fn`.
- Use `return yield*` for terminal failures, interruptions, or other non-continuing effects.
- Use `.pipe(...)` to add behavior to regular effects.
- Do not pipe an `Effect.fn`; pass additional behavior as extra arguments to `Effect.fn`.
- Use `Schema.TaggedErrorClass` for typed domain errors.
- Recover with `Effect.catch`, `Effect.catchTag`, or `Effect.catchTags`.
- Do not use JavaScript `try/catch` inside `Effect.gen` for Effect failures.

## Services and Layers

- Define services with `Context.Service`.
- Put behavior behind service interfaces instead of importing global singletons.
- Attach live implementations as static layers when that keeps the module easy to test.
- Return implementations with `ServiceName.of({ ... })`.
- Use `Layer.provide`, `Layer.provideMerge`, and `Layer.unwrap` to compose dependencies.
- Use `Context.Reference` for configuration values and feature flags with defaults.
- Use deterministic test layers for repositories, clocks, AI providers, and audit/event emitters.

## Lantern Application Rule

Lantern app code should be Effect-first across the stack:

- Domain commands and queries are Effects.
- Server handlers and server functions run Effect programs through a managed runtime.
- AI orchestration, retrieval, evals, imports, exports, integrations, and background jobs are Effects.
- React components may render idiomatic JSX, but data mutations, server calls, and meaningful side effects should enter the Effect service layer instead of growing ad hoc promise logic.
- Official LMS records remain deterministic domain state; AI workflows use Effect services to enforce policy, provenance, evaluation, audit, and human review.

## Testing

- Use `@effect/vitest`.
- Use `it.effect` for Effect-based tests.
- Use regular `it` for pure functions.
- Do not use `Effect.runSync` in tests.
- In `it.effect`, prefer `assert` methods from `@effect/vitest`.
- Use `TestClock` for time-dependent behavior.
- Test services with shared layers and small in-memory implementations.

## High-Value Reference Paths

- Basics: `repos/effect/ai-docs/src/01_effect/01_basics/`
- Services and layers: `repos/effect/ai-docs/src/01_effect/02_services/`
- Error handling: `repos/effect/ai-docs/src/01_effect/03_errors/`
- Resources and scopes: `repos/effect/ai-docs/src/01_effect/04_resources/`
- Running programs: `repos/effect/ai-docs/src/01_effect/05_running/`
- PubSub/events: `repos/effect/ai-docs/src/01_effect/06_pubsub/`
- Streams: `repos/effect/ai-docs/src/02_stream/`
- Managed runtime integration: `repos/effect/ai-docs/src/03_integration/`
- Request batching: `repos/effect/ai-docs/src/05_batching/`
- Schedules/retries: `repos/effect/ai-docs/src/06_schedule/`
- Observability: `repos/effect/ai-docs/src/08_observability/`
- Testing: `repos/effect/ai-docs/src/09_testing/`
- HTTP client: `repos/effect/ai-docs/src/50_http-client/`
- HTTP API: `repos/effect/ai-docs/src/51_http-server/`
- Child processes: `repos/effect/ai-docs/src/60_child-process/`
- CLI: `repos/effect/ai-docs/src/70_cli/`
- AI modules: `repos/effect/ai-docs/src/71_ai/`
- Cluster: `repos/effect/ai-docs/src/80_cluster/`

## Updating the Vendored Reference

Use the same subtree strategy from the Effect article:

```sh
git subtree pull \
  --prefix=repos/effect \
  https://github.com/Effect-TS/effect-smol.git \
  main \
  --squash
```

Keep `repos/effect` as reference material. Do not edit it for Lantern behavior.
