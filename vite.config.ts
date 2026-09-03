import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base:'/' 因为发布在用户页根路径 https://protein-zhang.github.io/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
})