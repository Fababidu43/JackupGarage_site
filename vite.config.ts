import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
