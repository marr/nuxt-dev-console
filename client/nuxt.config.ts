import { resolve } from 'pathe'

export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@nuxt/devtools-ui-kit',
  ],

  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client'),
    },
  },

  app: {
    baseURL: '/__my-module',
  },

  vite: {
    server: {
      hmr: {
        // Instead of go through proxy, we directly connect real port of the client app
        clientPort: +(process.env.PORT || 3300),
      },
    },
  },

  devtools: {
    enabled: false,
  },

  compatibilityDate: '2024-08-21',
})
