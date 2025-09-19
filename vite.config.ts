import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://185.185.143.72:443",
        changeOrigin: true,
        secure: false, // игнорируем недоверенный SSL
        //rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
