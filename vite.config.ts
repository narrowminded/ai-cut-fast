import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// For Vercel deployment, build as a static SPA (client-only).
// The app uses TanStack Router for client-side routing, no SSR needed.
export default defineConfig({
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});
