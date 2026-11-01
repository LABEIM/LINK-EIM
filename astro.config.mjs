import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://link.eimlab.org',
  vite: {
    plugins: [tailwindcss()],
  },
});
