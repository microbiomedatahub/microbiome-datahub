import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '^/(api|data)': {
          target: isProduction ? 'https://mdatahub.org' : 'http://localhost:8081',
          changeOrigin: true
        }
      }
    }
  }
})
