import { defineConfig } from "@lovable.dev/vite-tanstack-config";

<<<<<<< HEAD
// For Vercel deployment, build as a static SPA (client-only).
// The app uses TanStack Router for client-side routing, no SSR needed.
export default defineConfig({
  vite: {
    ssr: {
      noExternal: [],
    },
=======
// For Cloudflare Pages: build client-only SPA
// Do NOT build server/SSR to prevent wrangler.json in dist/client output
export default defineConfig({
  tanstackStart: {
    // Disable server build for Pages (static-only deployment)
    ssr: false,
>>>>>>> 2342819b6abf9d31b1634f21d7818351dd592536
  },
});
