<script setup lang="ts">
const { t } = useLocale()

const { userData } = storeToRefs(useUserDataStore())
// const { currencyCodeList, planCodeList, spendCategoryCodeList, startDateCodeList } = storeToRefs(useFilterDataStore())

useHead({
  title: t('pageTitle.main'),
})
</script>

<template>
  <div class="w-full">
    <h1>
      DewBee
    </h1>
    <p>
      {{ userData }}
    </p>
  </div>
</template>
