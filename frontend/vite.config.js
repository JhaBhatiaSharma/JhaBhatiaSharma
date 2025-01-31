import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Check if running in GitHub Pages
const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? "/JhaBhatiaSharma/" : "/",
 // Set correct base path
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
