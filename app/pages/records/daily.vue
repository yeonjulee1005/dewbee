<script setup lang="ts">
const { t } = useLocale()

useHead({
  title: t('pageTitle.dailySpend'),
})

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div>
    <h1>
      일일별 지출 내역
    </h1>
  </div>
</template>
