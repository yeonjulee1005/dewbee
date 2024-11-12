<script setup lang="ts">
const { t } = useLocale()

useHead({
  title: t('pageTitle.weeklySpend'),
})

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div>
    <h1>
      주간별 지출 내역
    </h1>
  </div>
</template>
