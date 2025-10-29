# Contributing to Teacher AI

Thank you for your interest in contributing!  Teacher AI is a living project and we welcome improvements from the community.  The guidelines below help maintain consistency and quality across the codebase.

## Branching model

The default branch is `main`.  For new features, create a feature branch prefixed with `feat/` (e.g. `feat/curriculum-planner`).  For bug fixes use `fix/` and for chores or tooling updates use `chore/`.

All work should be submitted via Pull Request.  Before starting significant work, please open an issue to discuss your idea.

## Commit messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.  Example:

```
feat(assignments): add rubric editor page

Implement a new page for instructors to create and edit rubrics for assignments.  Includes form validation and autosave.
```

## Pull request checklist

Include the following in your PR description when applicable:

* [ ] New or updated pages are reachable via router navigation
* [ ] State management is implemented using Zustand / React Query patterns
* [ ] Mock API endpoints return realistic data via MSW
* [ ] Unit tests (Vitest) and e2e tests (Playwright) covering happy path flows
* [ ] Linting (`pnpm lint`) and typechecking (`pnpm typecheck`) pass
* [ ] Documentation updated (README, architecture diagrams) where necessary

## Adding a new feature page

1. Create a folder under `src/app/pages/<area>/<PageName>` and add your React component.
2. Export a route entry in `src/app/routes.tsx` pointing to your page.
3. Implement any domain logic in `src/features/<area>/hooks` and UI elements in `src/features/<area>/components`.
4. Mock the necessary API responses in `packages/mocks/src/handlers.ts` and add fixtures in `packages/mocks/src/fixtures.ts`.
5. Write tests covering the new functionality.

## Adding an AI prompt

Prompt templates live in `packages/ai/src/prompts`.  Create a markdown file named appropriately (e.g. `grading.autograde.md`) containing plain English instructions.  You can reference these prompts from your provider or orchestrator implementation.

## Code of conduct

Please be respectful and considerate when communicating in issues, pull requests and discussions.  We value a friendly and inclusive environment.