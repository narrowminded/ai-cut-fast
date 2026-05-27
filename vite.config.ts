import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// For Cloudflare Pages: build client-only SPA
// Do NOT build server/SSR to prevent wrangler.json in dist/client output
export default defineConfig({
  tanstackStart: {
    // Disable server build for Pages (static-only deployment)
    ssr: false,
  },
});
