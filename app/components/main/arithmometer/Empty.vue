<script setup lang="ts">
withDefaults(
  defineProps<{
    spendCategoryCode?: string
    spendAmount?: number
  }>(),
  {
    spendCategoryCode: '',
    spendAmount: 0,
  },
)
</script>

<template>
  <div v-if="!spendCategoryCode || !spendAmount">
    <div
      v-if="!spendCategoryCode"
      class="flex items-center justify-end gap-x-1.5 mb-1"
    >
      <Icon
        name="i-lucide-triangle-alert"
        class="w-5 h-5 text-red-600 dark:text-red-400"
      />
      <span class="text-base font-light break-keep text-red-600 dark:text-red-400">
        {{ $t('main.require.category') }}
      </span>
    </div>
    <div
      v-if="!spendAmount"
      class="flex items-center justify-end gap-x-1.5"
    >
      <Icon
        name="i-lucide-triangle-alert"
        class="w-5 h-5 text-red-600 dark:text-red-400"
      />
      <span class="text-base font-light break-keep text-red-600 dark:text-red-400">
        {{ $t('main.require.amount') }}
      </span>
    </div>
  </div>
</template>
