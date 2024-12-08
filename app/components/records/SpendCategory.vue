<script setup lang="ts">
const { spendCategoryCodeList } = storeToRefs(useFilterDataStore())

withDefaults(
  defineProps<{
    categoryCount?: { code: string, value: number }[]
    statistics?: { chartDateLabel: string[], chartValuesUnit: string[], chartKrwValues: number[], chartUsdValues: number[], chartJpyValues: number[] }
  }>(),
  {
    categoryCount: () => [],
    statistics: () => ({
      chartDateLabel: [],
      chartValuesUnit: [],
      chartKrwValues: [],
      chartUsdValues: [],
      chartJpyValues: [],
    }),
  },
)

const selectSpendCatagroyIcon = (code: string, value: number) => {
  if (value === 0) {
    return ''
  }

  return spendCategoryCodeList.value.find(item => item.code === code)?.icon_name
}

const selectSpendCategoryName = (code: string, value: number) => {
  if (value === 0) {
    return ''
  }

  return spendCategoryCodeList.value.find(item => item.code === code)?.code_name
}

const colorTranslate = (code: string, type: 'text' | 'ring') => {
  switch (code) {
    case 'SCC001':
      return type === 'text' ? 'text-orange-700 dark:text-orange-300' : 'ring-orange-700/50 dark:ring-orange-300/50'
    case 'SCC002':
      return type === 'text' ? 'text-yellow-700 dark:text-yellow-300' : 'ring-yellow-700/50 dark:ring-yellow-300/50'
    case 'SCC003':
      return type === 'text' ? 'text-lime-700 dark:text-lime-300' : 'ring-lime-700/50 dark:ring-lime-300/50'
    case 'SCC004':
      return type === 'text' ? 'text-emerald-700 dark:text-emerald-300' : 'ring-emerald-700/50 dark:ring-emerald-300/50'
    case 'SCC005':
      return type === 'text' ? 'text-cyan-700 dark:text-cyan-300' : 'ring-cyan-700/50 dark:ring-cyan-300/50'
    case 'SCC006':
      return type === 'text' ? 'text-sky-700 dark:text-sky-300' : 'ring-sky-700/50 dark:ring-sky-300/50'
    case 'SCC007':
      return type === 'text' ? 'text-indigo-700 dark:text-indigo-300' : 'ring-indigo-700/50 dark:ring-indigo-300/50'
    case 'SCC008':
      return type === 'text' ? 'text-fuchsia-700 dark:text-fuchsia-300' : 'ring-fuchsia-700/50 dark:ring-fuchsia-300/50'
    case 'SCC009':
      return type === 'text' ? 'text-rose-700 dark:text-rose-300' : 'ring-rose-700/50 dark:ring-rose-300/50'
    case 'SCC010':
      return type === 'text' ? 'text-purple-700 dark:text-purple-300' : 'ring-purple-700/50 dark:ring-purple-300/50'
    case 'SCC011':
      return type === 'text' ? 'text-blue-700 dark:text-blue-300' : 'ring-blue-700/50 dark:ring-blue-300/50'
    default:
      return type === 'text' ? 'text-neutral-700 dark:text-neutral-300' : 'ring-neutral-700/50 dark:ring-neutral-300/50'
  }
}
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <p class="text-xl sm:text-2xl font-bold break-keep">
      {{ $t('share.label') }}
    </p>
    <div class="flex flex-wrap gap-3">
      <UCard
        v-for="(item, index) in categoryCount"
        v-show="item.value !== 0"
        :key="index"
        :ui="{
          root: `w-fit bg-transparent ring-2 ${colorTranslate(item.code, 'ring')}`,
          body: 'flex items-center gap-2 px-3 py-2 sm:p-2 sm:px-3 sm:py-2',
        }"
      >
        <Icon
          :name="selectSpendCatagroyIcon(item.code, item.value) ?? ''"
          :class="colorTranslate(item.code, 'text')"
          class="w-4 h-4 sm:w-6 sm:h-6"
        />
        <span class="text-sm sm:text-lg font-semibold">
          {{ selectSpendCategoryName(item.code, item.value) }}
        </span>
        <span class="text-sm sm:text-lg font-semibold">
          {{ item.value }}
        </span>
      </UCard>
    </div>
    <div class="flex flex-col sm:flex-row items-end gap-x-4">
      <UCard :ui="{ root: 'w-full bg-transparent ring-2 rounded-xl ring-amber-500/40' }">
        <ChartSmoothLine
          v-if="statistics.chartDateLabel.length > 0"
          :statistics-type="'daily'"
          :chart-date-label="statistics.chartDateLabel"
          :chart-values-unit="statistics.chartValuesUnit"
          :chart-krw-value="statistics.chartKrwValues"
          :chart-usd-value="statistics.chartUsdValues"
          :chart-jpy-value="statistics.chartJpyValues"
        />
      </UCard>
    </div>
  </div>
</template>
