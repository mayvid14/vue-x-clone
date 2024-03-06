/* eslint-disable node/prefer-global/process */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: [
    '~/assets/css/styles.scss',
    '~/assets/css/transitions.scss',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt-icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  supabase: {
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      cookieRedirect: true,
    },
  },
})
