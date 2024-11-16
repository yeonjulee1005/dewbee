// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
import packageJson from './package.json'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/devtools',
    '@nuxtjs/device',
    '@nuxtjs/seo',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/i18n',
    'nuxt-time',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@stefanobartoletti/nuxt-social-share',
  ],
  imports: {
    dirs: [
      'composables/**',
      'stores/**',
    ],
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { property: 'Imagetoolbar', content: 'no' },
        { name: 'naver-site-verification', content: '6eb6da4d3753c139c41f5b5cf3ec61c8151e6922' },
        { name: 'google-adsense-account', content: 'ca-pub-9720546940719922' },
      ],
    },
  },
  css: [
    '~/assets/scss/style.scss',
  ],
  site: {
    name: 'DewBee',
    url: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.NUXT_ENV_VERCEL_URL ?? 'http://localhost:5000',
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  ui: {
    fonts: false,
  },
  runtimeConfig: {
    public: {
      appVersion: JSON.stringify(packageJson.version),
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.NUXT_ENV_VERCEL_URL ?? 'http://localhost:5000',
      supabaseUrl: process.env.SUPABASE_URL ?? '',
      supabaseKey: process.env.SUPABASE_KEY ?? '',
      githubAccessToken: process.env.GITHUB_ACCESS_TOKEN ?? '',
    },
  },
  routeRules: {
    '/': { ssr: false },
  },
  sourcemap: {
    server: true,
    client: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  nitro: {
    preset: 'vercel',
    prerender: {
      failOnError: false,
    },
  },
  vite: {
    build: {
      sourcemap: false,
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.VERCEL_ENV === 'production',
        },
      },
    },
  },
  typescript: {
    shim: false,
  },
  eslint: {
    config: {
      stylistic: true,
    },
    checker: true,
  },
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'ko', file: 'ko.ts' },
      { code: 'en', file: 'en.ts' },
    ],
    defaultLocale: 'ko',
    strategy: 'no_prefix',
  },
  image: {
    format: ['svg', 'png', 'jpg', 'jpeg', 'webp'],
  },
  ogImage: {
    fonts: [
      'Source Code Pro',
    ],
    defaults: {
      renderer: 'satori',
    },
  },
  pinia: {
    storesDirs: [
      './stores/**',
    ],
  },
  socialShare: {
    styled: false,
    label: false,
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.NUXT_ENV_VERCEL_URL ?? 'http://localhost:5000',
  },
  stylelint: {
    lintOnStart: true,
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      // exclude: [
      //   '/',
      // ],
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  },
  vueuse: {
    ssrHandlers: false,
  },
})
