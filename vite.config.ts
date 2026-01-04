import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  // Enable SPA routing fallback for dev server
  server: {
    historyApiFallback: true,
  },
  // Optimize build chunks
  build: {
    chunkSizeWarningLimit: 600,
  },
});
