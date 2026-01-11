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
        target: 'https://ai-agent-backend-three.vercel.app/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});