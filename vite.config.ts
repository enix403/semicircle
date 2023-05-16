/// <reference types="vitest" />
import { defineConfig } from "vite";

import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  server: {
    port: 4200
  },
  plugins: [
    tsconfigPaths(),
    react(),
    mode === "test" && eslintPlugin()
  ]
}));
