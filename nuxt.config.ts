// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    bundledStorage: ['conferences'],
    devStorage: {
      conferences: {
        driver: 'fs',
        base: 'data/conferences'
      }
    },
  }
})
