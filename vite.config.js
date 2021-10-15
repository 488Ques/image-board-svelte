import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/api': 'http://localhost:7777',
    }
  },
  base: '/web/',
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    }
  }
})
