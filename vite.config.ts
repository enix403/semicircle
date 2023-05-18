import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  server: {
    port: 4200
  },
  plugins: [
    tsconfigPaths(),
    react(),
  ]
}));
