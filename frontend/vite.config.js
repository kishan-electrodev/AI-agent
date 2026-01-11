import { defineConfig } from "vite"

export default defineConfig({
  build:{
    rollupOptions: {
        input: {
            main: "index.html",
            login: "src/login.html",
            feedback: "src/feedback.html"
        }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://ubiquitous-palm-tree-44vv7g6prq7f5jqg-3000.app.github.dev',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});