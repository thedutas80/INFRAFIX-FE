import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // Import path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'events': path.resolve(__dirname, 'node_modules/events/events.js')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://103.164.191.212:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
