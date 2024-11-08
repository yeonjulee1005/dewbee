<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useLocale()
const { meta } = useRoute()

const { excuteUserData } = useLoadUserData()
const { executeFilterData } = useLoadFilterData()

const seoTitle = 'DewBee'
const seoDescription = '매주의 목표 소비금액을 손쉽게 관리하세요!'
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
  keywords: '소비관리,지출관리',
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

onMounted(async () => {
  await excuteUserData()
  await executeFilterData()
})
</script>

<template>
  <UApp :toaster="appConfig.toaster">
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="repeating-linear-gradient(to right,#bdbdbd 0%,#cb8a80 100%)"
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
</style>
