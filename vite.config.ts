import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import blinkoPlugin from "vite-plugin-blinko";

/**
 * Vite configuration for Blinko plugin
 */
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...blinkoPlugin()
  ]
}));