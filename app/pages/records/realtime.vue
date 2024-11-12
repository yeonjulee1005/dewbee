<script setup lang="ts">
const { t } = useLocale()

useHead({
  title: t('pageTitle.realtimeSpend'),
})

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div>
    <h1>
      실시간 지출 내역
    </h1>
  </div>
</template>
