import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    port: 5173,
    strictPort: true
  },
  server: {
    port: 5173,
    strictPort: true,
    host: "0.0.0.0",
    origin: "http://0.0.0.0:8080"
  }
})
