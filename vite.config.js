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
  }
});