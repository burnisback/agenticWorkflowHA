# Teacher AI

Teacher AI is an experimental learning management portal that integrates artificial intelligence to help educators and students collaborate on curriculum planning, assignments, grading, chat, social engagement and analytics.  This monorepo contains a Vite‑powered React application along with domain packages for core types, AI orchestration, mocks and UI components.

## Quick start

Install dependencies using [pnpm](https://pnpm.io):

```sh
pnpm install
pnpm dev
```

This will start the web application at <http://localhost:5173> and connect to the local MSW mock API.  The demo course `Algebra I` with seeded students, assignments and chat history is loaded automatically.

## Monorepo layout

| Path | Description |
|---|---|
| `apps/web` | Vite/React front end for teachers and students |
| `packages/core` | Domain models, zod schemas and utils |
| `packages/ai` | AI provider abstractions, orchestrator and prompt templates |
| `packages/mocks` | Mock Service Worker handlers and fixtures for local development |
| `packages/ui` | Shared UI components built on top of shadcn/ui |

Refer to [ARCHITECTURE.md](ARCHITECTURE.md) for a deeper explanation of the package boundaries and design choices.