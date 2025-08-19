import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import config from './src/assets/common/config'

// https://vite.dev/config/
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  let base = '/'
  if (mode === 'production') base = `/${config.name}/`
  else if (mode === 'plugin') base = `/${config.name}/dist`
  return {
    base,
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/styles/mixins.scss" as *;
          @use "@/assets/styles/colors.scss" as *;
          @use "@/assets/styles/variables.scss" as *;
        `,
        },
      },
    },
  }
})
