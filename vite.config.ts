import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    base: mode === 'devepment' ? '/' : '/vue-contacts',
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src')
      },
    },
    server: {
      port: 7171
    }
  }
})