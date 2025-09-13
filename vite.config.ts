import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import blinkoPlugin from "vite-plugin-blinko";

export default defineConfig(({ mode }) => ({
  plugins: [
    preact(),
    ...blinkoPlugin()
  ],
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client']
    }
  }
}));