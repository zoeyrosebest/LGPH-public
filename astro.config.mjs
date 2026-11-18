import { defineConfig } from 'astro/config';

export default defineConfig({
  // The live address. Change this the day the domain moves across, because
  // the canonical tags and the sitemap are both built from it.
  site: 'https://longgoneproductionhome.netlify.app',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { port: 3017 },
});
