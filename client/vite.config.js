import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})





// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 10000,
//     proxy: {
//       '/api': {
//         target: 'https://zauqapp-site.onrender.com',
//         changeOrigin: true,
//       }
//     }
//   },
//   build: {
//     outDir: 'dist',
//     sourcemap: true,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom', 'react-router-dom'],
//           ui: ['framer-motion', 'lucide-react']
//         }
//       }
//     }
//   }
// })