import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {},
  },
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      components: path.resolve(__dirname, "src/components/"),
      shared: path.resolve(__dirname, "./src/shared/"),
      public: path.resolve(__dirname, "public/"),
      pages: path.resolve(__dirname, "src/pages"),
      types: path.resolve(__dirname, "src/@types/"),
    },
  },
});
