import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', 
  plugins: [react()],
  optimizeDeps: {
    include: ['es-toolkit/compat/throttle']
  },
build: {
    rollupOptions: {
      external: ['@mui/icons-material'],
    },
  },
})
