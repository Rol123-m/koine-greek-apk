 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/koine-greek-app/', // ¡IMPORTANTE! Esta línea es nueva
  server: {
    port: 3000,
  }
})
