import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: { proxy: { '/api': 'http://localhost:3001' } },
  preview: { allowedHosts: ['maggiee-1.onrender.com'], proxy: { '/api': 'http://localhost:3001' } },
})
