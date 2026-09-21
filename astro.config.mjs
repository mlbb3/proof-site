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
  // Canonical URL. Set to the real domain when it lands; og:url depends on it.
  site: 'https://example.com',
  build: {
    // One inlined stylesheet keeps the WhatsApp webview from blocking on CSS.
    inlineStylesheets: 'always',
  },
});
