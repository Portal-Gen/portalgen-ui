import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      '/user-service': {  // This will match the base path of your backend URL
        target: 'http://localhost',  // The host of your backend
        changeOrigin: true,  // Needed to avoid host header issues
        rewrite: path => path.replace(/^\/user-service/, '/user-service')  // Rewrite the URL path to target correctly
      }
    },
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
      api: path.resolve(__dirname, "src/api/"),
    },
  },
});
