import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import paths from 'vite-tsconfig-paths';
import { dynamicImport } from 'vite-plugin-dynamic-import';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    paths()
  ]
});
