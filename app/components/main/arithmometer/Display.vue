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
  <div class="w-full sm:w-1/2 flex flex-col items-end">
    <span
      v-if="spendCategoryCode || spendAmount"
      class="text-xl font-extralight"
    >
      {{ $t('main.target') }}
    </span>
    <span
      v-if="spendCategoryName && spendCategoryCode"
      class="text-lg font-light text-amber-600 dark:text-amber-400 mt-1 mb-2"
    >
      {{ spendCategoryName }}
    </span>
    <div
      v-else
      class="flex items-center justify-end gap-x-1.5 mt-1 mb-2"
    >
      <Icon
        name="i-lucide-triangle-alert"
        class="w-5 h-5 text-red-600 dark:text-red-400"
      />
      <span class="text-lg font-light break-keep text-red-600 dark:text-red-400">
        {{ $t('main.require.category') }}
      </span>
    </div>
    <span
      v-if="spendAmount"
      class="text-4xl font-bold break-keep mb-1"
    >
      {{ comma(spendAmount).concat($t(`currency.${currencyCode}`)) }}
    </span>
    <div
      v-else
      class="h-11 flex items-center justify-end gap-x-1.5"
    >
      <Icon
        name="i-lucide-triangle-alert"
        class="w-5 h-5 text-red-600 dark:text-red-400"
      />
      <span class="text-lg font-light break-keep text-red-600 dark:text-red-400">
        {{ $t('main.require.amount') }}
      </span>
    </div>
  </div>
</template>
