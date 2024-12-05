import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
  // server: {
  //   proxy: {
  //     'ipfs': {
  //       target: 'http://localhost:8080/ipfs',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/ipfs/, ''),
  //     }
  //   },
  //   https: {
  //     key: './src/certs/crowdsourcing-privateKey.key',
  //     cert: './src/certs/crowdsourcing.crt',
  //   },

  //   cors: false
  // }
})
