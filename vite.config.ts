import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isStaging = mode === 'staging'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '^/(api|data)': {
          target: isStaging ? 'http://localhost:8081' : 'https://mdatahub.org',
          changeOrigin: true
        }
      }
    }
  }
})
