import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
    },
  },
  plugins: [
    tailwindcss(),
  ],
   build: {
    outDir: 'dist', // Vercel looks for dist
  }
})
              