import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import blinkoPlugin from "vite-plugin-blinko";

/**
 * Vite configuration for Blinko RTL plugin
 */
export default defineConfig(({ mode }) => ({
  plugins: [
    preact(),
    ...blinkoPlugin()
  ],
  build: {
    outDir: mode === "production" ? "release" : "dist",
    emptyOutDir: true,
  }
}));