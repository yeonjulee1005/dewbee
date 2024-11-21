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
const seoKeywords = '여유자금 관리, 소비 내역 체크, 소비 습관 개선, 자금 관리 서비스, 주간 소비 기록, 가계부 앱, 재무 관리 도구, 지출 관리, 소비 패턴 분석, 자산 관리, budget management, spending tracker, expense tracking, weekly budget, financial planning, money management app, personal finance, expense monitoring, spending habits, financial insights'
const seoUrl = 'https://dewbee.dewdew.world'
const seoImage = 'https://dewbee.dewdew.world/image/image_og.jpg'

useHead({
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

if (import.meta.server) {
  useHead({
    title: (meta.title as string) ?? t('pageTitle.dewbee'),
    htmlAttrs: {
      lang: 'ko',
    },
    meta: () => [
      { name: 'msapplication-TileColor', content: '#0A0A0A' },
      { name: 'theme-color', content: '#fdc6b1' },
    ],
    link: [
      { rel: 'canonical', href: seoUrl },
      { rel: 'icon', type: 'image/svg+xml', href: '/image/favicon.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/image/favicon-96x96.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/image/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
    ],
  })
}

useSeoMeta({
  charset: 'utf-16',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0',
  formatDetection: 'telephone=no',
  themeColor: '#fdc6b1',
  keywords: seoKeywords,
  title: seoTitle,
  author: 'Dewdew',
  description: seoDescription,
  ogType: 'website',
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogUrl: seoUrl,
  ogImage: seoImage,
  ogImageSecureUrl: seoImage,
  ogImageType: 'image/png',
  ogImageWidth: '410',
  ogImageHeight: '200',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: seoImage,
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
