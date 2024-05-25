import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// Ensure the environment variable is prefixed with VITE_

// localhost

export default defineConfig({
  server: {
    proxy: {
      "/user-service": {
        // This will match the base path of your backend URL
        target: "http://192.168.1.139", // The host of your backend
        changeOrigin: true, // Needed to avoid host header issues
        rewrite: (path) => path.replace(/^\/user-service/, "/user-service"), // Rewrite the URL path to target correctly
      },

      "/recommendation-service": {
        // This will match the base path of your backend URL
        target: "http://192.168.1.139:8082",
        changeOrigin: true, // Needed to avoid host header issues
        rewrite: (path) =>
          path.replace(/^\/recommendation-service/, "/recommendation-service"), // Rewrite the URL path to target correctly
      },
      "/place-service": {
        // This will match the base path of your backend URL
        target: "http://192.168.1.139:81",
        changeOrigin: true, // Needed to avoid host header issues
        rewrite: (path) => path.replace(/^\/place-service/, "/place-service"), // Rewrite the URL path to target correctly
      },
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
