import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// For Vercel static deployment, build as client-only SPA
export default defineConfig({
  vite: {
    ssr: {
      noExternal: [],
    },
    build: {
      ssr: false, // Only build client, not server
      outDir: 'dist/client',
      emptyOutDir: true,
    },
  },
});
