import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Because Vite uses ES Modules, we need to replicate __dirname manually
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This tells Vite that whenever it sees '@', it should look inside the 'src' folder
      '@': path.resolve(__dirname, './src'),
    },
  },
})