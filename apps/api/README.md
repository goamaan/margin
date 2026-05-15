# Margin API

Standalone backend API runtime.

This app exposes Margin's canonical HTTP API. The web app, future mobile apps, integrations, and external clients should all use this API path rather than private framework server functions for core LMS workflows.

Development:

```bash
bun run --filter api dev
```

Default URL: `http://localhost:4000`.
