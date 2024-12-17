import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // This will intercept any requests to /api
        target: 'https://ping-buddy.vercel.app', // Your backend URL
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' prefix
      },
    },
  },
});
