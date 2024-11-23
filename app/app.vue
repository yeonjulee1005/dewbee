<script setup lang="ts">
const appConfig = useAppConfig()
const { width } = useWindowSize()

const { t } = useCustomLocale()
const { meta } = useRoute()

const { windowSize } = storeToRefs(useWindowStore())

const { executeUpdateData } = useLoadUserData()
const { executeFilterData } = useLoadFilterData()

const seoTitle = 'DewBEE - 주간 여유자금 관리 및 소비 내역 체크 서비스'
const seoDescription = 'DewBEE는 여유자금을 효율적으로 관리하고 소비 내역을 주간 단위로 기록할 수 있는 개인 재무 관리 서비스입니다. 소비 습관을 개선하고 지출 패턴을 분석하여 더 나은 자산 관리를 도와줍니다.'
const seoUrl = 'https://dewbee.dewdew.world'
const seoImage = 'https://dewbee.dewdew.world/image/image_og.png'

useHead({
  title: (meta.title as string) ?? t('pageTitle.dewbee'),
  titleTemplate: (title?: string | undefined): string | null => {
    let returnTitle = null
    if (!title) {
      returnTitle = t('pageTitle.dewbee').concat(' | ', '메인')
      return returnTitle
    }

    if (!title?.includes(t('pageTitle.dewbee'))) {
      returnTitle = t('pageTitle.dewbee').concat(' | ', title)
      return returnTitle
    }
    else {
      returnTitle = title
      return returnTitle
    }
  },
})

useServerHead({
  meta: () => [
    { name: 'charset', content: 'utf-16' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=yes' },
    { name: 'title', content: seoTitle },
    { name: 'author', content: 'Dewdew' },
    { name: 'theme-color', content: '#fdc6b1' },
    { name: 'msapplication-TileColor', content: '#fdc6b1' },
    { name: 'naver-site-verification', content: '6eb6da4d3753c139c41f5b5cf3ec61c8151e6922' },
    { name: 'google-adsense-account', content: 'ca-pub-9720546940719922' },
    { property: 'imagetoolbar', content: 'no' },
    { property: 'og:url', content: seoUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:title', content: (meta.title as string) || seoTitle },
    { name: 'description', content: (meta.description as string) || seoDescription },
    { property: 'og:description', content: (meta.description as string) || seoDescription },
    { property: 'og:image', content: seoImage, key: 'og:image' },
    { property: 'og:image:type', content: 'image/png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoTitle },
    { name: 'twitter:description', content: seoDescription },
    { name: 'twitter:image', content: seoImage },
    { name: 'twitter:site', content: '@dewdew' },
    { name: 'twitter:creator', content: '@dewdew' },
  ],
  link: [
    { rel: 'canonical', href: seoUrl },
    { rel: 'manifest', href: '/manifest.webmanifest' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/image/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/image/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/image/favicon-96x96.png' },
    { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml' },
  ],
  script: [
    {
      hid: 'google-adsense',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9720546940719922',
      crossorigin: 'anonymous',
      defer: true,
    },
  ],
})

if (import.meta.server) {
  executeUpdateData()
  executeFilterData()
}

watchEffect(() => {
  if (import.meta.client) {
    windowSize.value = width.value
  }
})
</script>

<template>
  <UApp :toaster="appConfig.toaster">
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="repeating-linear-gradient(to right,##feeae2 0%,##dd5825 100%)"
        :height="5"
      />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
@import 'tailwindcss';
@import '@nuxt/ui';
@theme {
  --font-family-sans: 'Source Code Pro', 'Pretendard Variable', Pretendard, Roboto, -apple-system, BlinkMacSystemFont, 'SUIT Variable', system-ui, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;

  --color-amber-50: #fef5f2;
  --color-amber-100: #feeae2;
  --color-amber-200: #fed8ca;
  --color-amber-300: #fdc6b1;
  --color-amber-400: #f99670;
  --color-amber-500: #f07343;
  --color-amber-600: #dd5825;
  --color-amber-700: #ba471b;
  --color-amber-800: #9a3d1a;
  --color-amber-900: #80381c;
  --color-amber-950: #451a0a;
}

.break-keep {
  word-break: keep-all;
}
</style>
