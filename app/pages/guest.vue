<script setup lang="ts">
const { t } = useCustomLocale()

useHead({
  title: t('pageTitle.main'),
})

definePageMeta({
  middleware: 'guest',
})
</script>

<template>
  <div class="w-full h-fit pb-2">
    <div class="h-fit flex flex-col gap-y-6 px-6 py-4">
      <MainIntroTitle />
      <MainIntroDescriptions />
      <AFooter />
    </div>
  </div>
</template>
