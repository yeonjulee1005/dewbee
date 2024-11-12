<script setup lang="ts">
const { comma } = useUi()

withDefaults(
  defineProps<{
    spendCategoryCode?: string
    spendCategoryName?: string
    spendAmount?: number
    currencyCode?: string
  }>(),
  {
    spendCategoryCode: '',
    spendCategoryName: '',
    spendAmount: 0,
    currencyCode: 'CYC001',
  },
)
</script>

<template>
  <div
    v-if="spendCategoryCode || spendAmount"
    class="flex flex-col items-end"
  >
    <span class="text-lg font-extralight">
      {{ $t('main.target') }}
    </span>
    <span
      v-if="spendCategoryName"
      class="text-lg font-extralight"
    >
      {{ spendCategoryName }}
    </span>
    <span
      v-if="spendAmount"
      class="text-2xl font-semibold break-keep"
    >
      {{ comma(spendAmount).concat($t(`currency.${currencyCode}`)) }}
    </span>
  </div>
</template>
