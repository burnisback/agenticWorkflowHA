/// <reference types="vite/client" />

/**
 * Declaration for Vite environment variables used in the Teacher AI app.
 * These keys are exposed at build time via `import.meta.env` and should
 * correspond to entries in `.env.example`. Real secrets must never be
 * committed; developers should create a local `.env` file or provide
 * variables via the deployment environment.
 */
interface ImportMetaEnv {
  readonly VITE_AI_PROVIDER?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_ANTHROPIC_API_KEY?: string;
  readonly VITE_ANALYTICS_WRITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}