import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/My_Portfolio/", // Set base for GitHub Pages deployment
  plugins: [react()],
});
