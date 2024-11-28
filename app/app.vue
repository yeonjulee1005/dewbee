<script setup lang="ts">
const appConfig = useAppConfig()
const { width } = useWindowSize()

const user = useSupabaseUser()
const { t } = useCustomLocale()
const { meta } = useRoute()

const { windowSize } = storeToRefs(useWindowStore())

const { executeUpdateData } = useLoadUserData()
const { executeFilterData } = useLoadFilterData()

const seoTitle = 'DewBee - 주간 여유자금 관리 및 소비 내역 체크 서비스'
const seoDescription = 'DewBee는 여유자금을 효율적으로 관리하고 소비 내역을 주간 단위로 기록할 수 있는 개인 재무 관리 서비스입니다. 소비 습관을 개선하고 지출 패턴을 분석하여 더 나은 자산 관리를 도와줍니다.'
const seoUrl = 'https://dewbee.dewdew.world'
const seoImage = 'https://dewbee.dewdew.world/image/image_og.png'

useHead({
  title: (meta.title as string) ?? t('pageTitle.dewbee'),
  titleTemplate: (title?: string | undefined): string | null => {
    if (!title) {
      return t('pageTitle.dewbee').concat(' | ', '메인')
    }

    return !title.includes(t('pageTitle.dewbee'))
      ? t('pageTitle.dewbee').concat(' | ', title)
      : title
  },
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
  meta: [
    { name: 'naver-site-verification', content: '6eb6da4d3753c139c41f5b5cf3ec61c8151e6922' },
    { name: 'google-adsense-account', content: 'ca-pub-9720546940719922' },
    { property: 'imagetoolbar', content: 'no' },
  ],
})

useSeoMeta({
  charset: 'utf-16',
  formatDetection: 'telephone=no',
  viewport: 'width=device-width, initial-scale=1, user-scalable=yes',
  title: (meta.title as string) || seoTitle,
  author: 'Dewdew',
  description: (meta.description as string) || seoDescription,
  themeColor: '#fdc6b1',
  msapplicationTileColor: '#fdc6b1',
  ogTitle: (meta.title as string) || seoTitle,
  ogDescription: (meta.description as string) || seoDescription,
  ogImage: seoImage,
  ogImageType: 'image/png',
  ogType: 'website',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  twitterCard: 'summary_large_image',
  twitterTitle: (meta.title as string) || seoTitle,
  twitterDescription: (meta.description as string) || seoDescription,
  twitterImage: seoImage,
  twitterSite: '@dewdew',
  twitterCreator: '@dewdew',
})

onServerPrefetch(async () => {
  windowSize.value = width.value

  if (user.value) {
    await executeUpdateData()
  }
  await executeFilterData()
})

watch(width, () => {
  if (import.meta.client) {
    windowSize.value = width.value
  }
}, {
  immediate: true,
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
