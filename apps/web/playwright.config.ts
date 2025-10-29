import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for end‑to‑end tests. The tests target the Vite
 * development server running on port 5173. CI will spin up the app
 * concurrently before executing these tests.
 */
export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'pnpm --filter @teacher-ai/web dev --host --port 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  },
  use: {
    baseURL: 'http://localhost:5173',
    headless: true
  }
});