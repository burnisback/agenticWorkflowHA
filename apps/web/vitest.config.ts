import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * Vitest configuration for unit tests within the web app. It reuses
 * Vite's React plugin and configures a jsdom environment suitable for
 * React Testing Library. The setup file registers custom matchers from
 * jest-dom.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['src/__tests__/**/*.test.ts', 'src/__tests__/**/*.test.tsx']
  }
});