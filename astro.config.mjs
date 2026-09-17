// @ts-check
import { defineConfig } from 'astro/config';

// Permanent, prerendered calling card. Static by default.
// The one server function (the live surface) is added at build-order step 4
// via the Vercel adapter with a single non-prerendered endpoint. Not before.
export default defineConfig({
  output: 'static',
  // site is the canonical URL; set to the real domain when it lands.
  // Absolute og:url / og:image depend on this.
  site: 'https://example.com',
  build: {
    // One inlined stylesheet keeps the WhatsApp webview from blocking on CSS.
    inlineStylesheets: 'always',
  },
});
