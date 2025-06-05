import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@vueuse/nuxt',
  ],

  devtools: {
    enabled: false,
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      charset:'UTF-8',
      title:' 加 密 通 信',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
      ],
      htmlAttrs: {
        lang: 'zh-CN',
      },
      meta: [
        { name: 'description', content: "wabibabu" },
        { name: 'robots', content: 'index, follow' },
        { name: 'build-date', content: new Date().toISOString() }
      ],
    },
  },

  future: {
    compatibilityVersion: 3,
  },
  compatibilityDate: '2024-08-14',
  nitro: {
    preset: 'node-server',
    routeRules: {
     '/': { prerender: true, } ,
     'gugugaga': { prerender: true, } ,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})