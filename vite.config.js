import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/koine-greek-apk/', // ¡IMPORTANTE! Añadir esta línea
  server: {
    port: 3000,
  }
})
