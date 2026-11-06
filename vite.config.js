import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative paths allow deployment in any subdomain or subfolder
  server: {
    port: 3000,
    open: false,
    host: true
  }
})
