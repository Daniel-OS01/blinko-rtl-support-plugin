import { defineConfig } from "vite";
import blinkoPlugin from "vite-plugin-blinko";

export default defineConfig(({ mode }) => ({
  plugins: [
    ...blinkoPlugin()
  ],
  build: {
    outDir: mode === 'production' ? 'release' : 'dist'
  }
}));