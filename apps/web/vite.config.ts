import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@teacher-ai/core': path.resolve(__dirname, '../../packages/core/src'),
        '@teacher-ai/ai': path.resolve(__dirname, '../../packages/ai/src'),
        '@teacher-ai/mocks': path.resolve(__dirname, '../../packages/mocks/src'),
        '@teacher-ai/ui': path.resolve(__dirname, '../../packages/ui/src')
      }
    },
    server: {
      port: 5173
    }
  };
});