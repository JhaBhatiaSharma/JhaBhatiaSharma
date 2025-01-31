import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  base: isGitHubPages ? "/JhaBhatiaSharma/" : "/",  // ✅ Adjust base path for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(
      isGitHubPages
        ? "https://jhabhatiasharma.onrender.com"  // ✅ Use Render backend when deployed
        : "http://localhost:5001"  // ✅ Use local backend when running locally
    ),
  },
});
