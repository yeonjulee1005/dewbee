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
        // { name: 'naver-site-verification', content: '158291e2c0440b1ab952cba20d55d36e61766b00' },
      ],
      script: [
        // {
        //   hid: 'NaverIdLogin',
        //   src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js',
        //   defer: true,
        // },
        // {
        //   hid: 'KakaoMaps',
        //   src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_API_KEY}&libraries=services`,
        //   type: 'text/javascript',
        // },
        // {
        //   hid: 'KakaoApis',
        //   src: 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js',
        //   type: 'text/javascript',
        // },
      ],
    },
  },
  css: [
    '~/assets/scss/style.scss',
  ],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.NUXT_ENV_VERCEL_URL ?? 'http://localhost:5000',
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  ui: {
    prefix: 'DB',
  },
  runtimeConfig: {
    public: {
      appVersion: JSON.stringify(packageJson.version),
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.NUXT_ENV_VERCEL_URL ?? 'http://localhost:5000',
      supabaseUrl: process.env.SUPABASE_URL ?? '',
      supabaseKey: process.env.SUPABASE_KEY ?? '',
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
  sourcemap: {
    server: true,
    client: true,
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
      sourcemap: true,
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
      exclude: [
        '/',
      ],
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
