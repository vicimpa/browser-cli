import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist'
  },
  base: './',
  plugins: [
    react({ plugins: [] }),
    paths({ projects: ["../tsconfig.json"] })
  ]
});
