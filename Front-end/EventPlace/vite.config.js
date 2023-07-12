import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

const firstConfig = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8081'
    }
  },
  define: {
    'process.env': process.env,
    global: 'window'
  }
});

export default mergeConfig(firstConfig);
