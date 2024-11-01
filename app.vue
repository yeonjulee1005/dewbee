<script setup lang="ts">
const { t } = useLocale()
const { meta } = useRoute()

const seoTitle = 'DewBee'
const seoDescription = '간단소비 관리 서비스'
const seoUrl = 'https://dewbee.dewdew.world'
const seoImage = 'https://dewbee.dewdew.world/image/image_og.jpg'

useHead({
  titleTemplate: (title: string | undefined) => {
    let returnTitle = null
    returnTitle = title && !title?.includes(t('pageTitle.dewbee').concat(' | '))
      ? t('pageTitle.dewbee').concat(' | ', title)
      : null
    return returnTitle
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
</script>

<template>
  <div>
    <NuxtLayout>
      <div>
        <NuxtLoadingIndicator
          color="repeating-linear-gradient(to right,#bdbdbd 0%,#cb8a80 100%)"
          :height="5"
        />
        <NuxtPage />
        <DBNotifications />
      </div>
    </NuxtLayout>
  </div>
</template>
