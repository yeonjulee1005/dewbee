<script setup lang="ts">
const { t } = useLocale()

useHead({
  title: t('pageTitle.familyService'),
})
</script>

<template>
  <div>
    <h1>
      {{ $t('pageTitle.familyService') }}
    </h1>
  </div>
</template>
