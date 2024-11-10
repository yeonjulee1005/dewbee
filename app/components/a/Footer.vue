<script setup lang="ts">
const { t } = useLocale()

const computedBusinessInfo = computed(() => {
  return t('pageTitle.businessName').concat(' | ', t('pageTitle.businessNumber')).concat(' | ', t('pageTitle.businessAddress'))
})
</script>

<template>
  <div class="w-full text-center text-xs px-2 py-1">
    <p class="break-keep">
      {{ computedBusinessInfo }}
    </p>
    <p class="break-keep mt-1">
      {{ $t('pageTitle.copyright') }}
    </p>
  </div>
</template>
