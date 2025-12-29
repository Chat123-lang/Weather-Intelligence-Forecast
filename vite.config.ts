import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/config': path.resolve(__dirname, './src/config'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/geo': {
        target: 'https://api.openweathermap.org/geo/1.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/geo/, ''),
        secure: false,
      },
      '/api/weather': {
        target: 'https://api.openweathermap.org/data/2.5',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, ''),
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
  },
});