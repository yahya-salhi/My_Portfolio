import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/My_Portfolio/",
  plugins: [react()],
  build: {
    minify: "terser",
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/three") ||
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/drei")
          ) {
            return "three-vendor";
          }
          if (id.includes("framer-motion")) {
            return "motion";
          }
          if (id.includes("react-vertical-timeline-component")) {
            return "timeline";
          }
          if (id.includes("@emailjs")) {
            return "emailjs";
          }
          if (id.includes("react-hot-toast")) {
            return "toast";
          }
        },
      },
    },
  },
});
