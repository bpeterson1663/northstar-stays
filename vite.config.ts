import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API calls to the local Go server during development.
      '/stays': 'http://localhost:8080',
      '/bookings': 'http://localhost:8080',
    },
  },
})
