# Lantern

Lantern is an AI-first learning management system built from first principles.

This repository starts as a Bun workspace monorepo with TanStack Start, shadcn/ui, and an Effect-first application architecture.

## Architecture

- `apps/web`: TanStack Start web app, SSR, and route-level UX.
- `apps/api`: canonical HTTP API runtime.
- `apps/worker`: reserved for future background workers.
- `packages/ui`: shadcn/ui component package.
- `packages/domain`: domain schemas, value objects, errors, events, and invariants.
- `packages/application`: Effect use cases, command/query services, policies, and ports.
- `packages/runtime`: Effect layer composition and framework bridges.
- `packages/db`: persistence adapters and migrations.
- `packages/ai`: AI primitives, provider boundaries, policy checks, and retrieval contracts.
- `packages/api`: API schemas, typed client helpers, and server adapter.
- `packages/integrations`: LTI, OneRoster, SSO, SIS, and import/export adapters.
- `packages/evals`: evaluation harnesses and scoring.
- `packages/fixtures`: synthetic school data and edge cases.
- `packages/testing`: shared Effect test layers and helpers.

See `docs/architecture.md` and `docs/rfcs/0001-technical-foundation.md`.

## Development

```bash
bun install
bun run dev
```

The dev command runs both the web app and API:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`

Useful checks:

```bash
bun run typecheck
bun run lint
bun run check
```

## Adding components

To add shadcn components, run the CLI against the web app:

```bash
bunx --bun shadcn@latest add button -c apps/web
```

Shared UI components are installed in `packages/ui/src/components`.

## Using components

```tsx
import { Button } from "@workspace/ui/components/button"
```
