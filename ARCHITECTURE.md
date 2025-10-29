# Architecture Overview

This monorepo is organised as a set of packages under the `packages/` folder and a single application under `apps/web/`.  Each package is published under the `@teacher-ai` scope for internal consumption but not for external publishing.  Vite and pnpm power the development workflow.

## Packages

### `@teacher-ai/core`

Defines the domain entities (User, Course, Assignment, Submission, Grade and so on) as TypeScript interfaces.  Corresponding Zod schemas live under `src/schemas` and provide runtime validation.  Factory helpers in `src/factories` can generate fake data for tests and seed fixtures.

### `@teacher-ai/ai`

Provides a provider‑agnostic AI orchestration layer.  `AiOrchestrator` selects between `OpenAIProvider`, `AnthropicProvider` and `LocalMockAi` based on `VITE_AI_PROVIDER`.  Prompt templates live under `src/prompts` and are stored as markdown files.  The guardrail utilities in `src/guardrails/safety.ts` implement simple content‑safety checks and can be extended for age gating or toxicity thresholds.

### `@teacher-ai/mocks`

Contains Mock Service Worker (MSW) handlers and fixtures used by both browser and Node environments.  The fixtures live in `src/fixtures.ts` and include demo courses, students, assignments, submissions and chat messages.  Handlers are grouped by resource and exported from `src/handlers.ts`.

### `@teacher-ai/ui`

Wraps components from the [shadcn/ui](https://ui.shadcn.com/) library and exposes a small design system based on Tailwind CSS with OKLCH tokens.  Additional components such as data tables, empty states and loading indicators live here for reuse across pages.

## Application

### `/apps/web`

The front end is a modern React 18 application bootstrapped with Vite and written in TypeScript.  It uses React Router for navigation, Zustand for local state management, React Query for server state and caching, React Hook Form with Zod for form management and validation, and MSW for mocked API calls.  The UI layer relies on shadcn/ui, Tailwind CSS and lucide-react icons.

The application is structured as follows:

* `src/app`: top‑level application shell, routing definitions and providers for query, i18n, theme and auth.
* `src/app/layout`: layout components including the sidebar, top bar and overall grid.  A11y considerations are built in.
* `src/app/pages`: route components for each feature area (dashboard, learn, assignments, grading, chat, social, analytics, admin and settings).  These pages compose domain‑specific components from the features directories.
* `src/features`: domain‑specific hooks, services and components grouped by feature.  For example, `src/features/assignments` contains hooks for listing and creating assignments and components for assignment lists and detail pages.
* `src/services`: shared infrastructure such as API client configuration (`apiClient.ts`), abstracted authentication client (`authClient.ts`) and feature flag definitions (`featureFlags.ts`).
* `src/styles`: Tailwind base import and theme tokens.

## Testing

Unit tests are written with [Vitest](https://vitest.dev/) and Testing Library.  End‑to‑end tests use [Playwright](https://playwright.dev/).  The MSW handlers are imported into both test environments to provide consistent fixtures.

The GitHub Actions CI pipeline defined in `.github/workflows/ci.yml` installs dependencies, runs linting, type checking, unit tests and e2e tests in headless mode, and builds the application.  Playwright test reports are uploaded as artifacts.