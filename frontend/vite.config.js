import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    /**
     * Dev-server proxy: any request starting with /api is forwarded to
     * the Spring Boot backend. This eliminates CORS issues in development
     * without requiring the backend to know the frontend's origin.
     *
     * In production, configure your reverse proxy (Nginx/Apache) the same way.
     */
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
