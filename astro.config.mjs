import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://link.eimlab.org',
  integrations: [react(), keystatic()],
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});
