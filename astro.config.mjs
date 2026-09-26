// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// A prerendered calling card, plus one server function: POST /api/draft, the
// live surface. Every page is static; only that endpoint opts out with
// `prerender = false`.
export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  adapter: vercel(),
  // Canonical URL and the base for the link-preview image. Vercel sets the
  // production address at build time (the custom domain once there is one).
  site: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://proof-site-xi.vercel.app',
  build: {
    // One inlined stylesheet keeps the WhatsApp webview from blocking on CSS.
    inlineStylesheets: 'always',
  },
});
