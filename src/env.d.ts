/// <reference types="astro/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Keystatic Cloud project slug, in the form `team/project`. */
  readonly PUBLIC_KEYSTATIC_CLOUD_PROJECT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
