import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import blinkoPlugin from "vite-plugin-blinko";
import pluginJson from "./plugin.json";

/**
 * Vite configuration for Blinko RTL plugin
 */
export default defineConfig(({ mode }) => ({
  define: {
    __PLUGIN_VERSION__: JSON.stringify(pluginJson.version),
  },
  plugins: [
    preact(),
    ...blinkoPlugin()
  ],
  build: {
    outDir: mode === "production" ? "release" : "dist",
    emptyOutDir: true,
  }
}));