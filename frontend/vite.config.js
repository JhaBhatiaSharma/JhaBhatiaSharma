import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  base: isGitHubPages ? "/JhaBhatiaSharma/" : "/",  // Adjust for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
