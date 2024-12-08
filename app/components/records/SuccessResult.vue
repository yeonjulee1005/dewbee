<script setup lang="ts">
const { t } = useCustomLocale()
const { comma } = useUi()

const { userData } = storeToRefs(useUserDataStore())

withDefaults(
  defineProps<{
    currencyCode?: string
    summaryAmount?: number
    targetAmount?: number
  }>(),
  {
    currencyCode: '',
    summaryAmount: 0,
    targetAmount: 0,
  },
)

const computedSpendSituation = (summaryAmount: number, targetAmount: number) => {
  let theme: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'secondary'
  let color = 'text-blue-400'
  let label = t('main.situation.excellent')

  const percentage = (summaryAmount / targetAmount) * 100

  if (percentage <= 25) {
    theme = 'secondary'
    color = 'text-blue-400'
    label = t('share.situation.excellent')
  }
  else if (percentage <= 50) {
    theme = 'success'
    color = 'text-green-400'
    label = t('share.situation.good')
  }
  else if (percentage <= 75) {
    theme = 'warning'
    color = 'text-yellow-400'
    label = t('share.situation.warning')
  }
  else if (percentage <= 100) {
    theme = 'primary'
    color = 'text-amber-400'
    label = t('share.situation.danger')
  }
  else {
    theme = 'error'
    color = 'text-red-400'
    label = t('share.situation.over')
  }

  return { theme, color, label }
}
</script>

<template>
  <div
    v-if="userData.currency.code === currencyCode"
    class="flex flex-col items-end gap-y-2"
  >
    <p
      class="text-xl sm:text-2xl font-semibold break-keep"
      :class="computedSpendSituation(summaryAmount, targetAmount).color"
    >
      {{ computedSpendSituation(summaryAmount, targetAmount).label }}
    </p>
    <p
      v-if="summaryAmount > targetAmount"
      class="text-lg sm:text-xl font-semibold break-keep"
    >
      <span class="text-red-400 font-semibold">
        {{ comma(summaryAmount - targetAmount) }} {{ $t(`currency.${currencyCode}`) }}
      </span>
      <span>
        {{ $t('share.over') }}
      </span>
    </p>
    <p
      v-else
      class="text-lg sm:text-xl font-semibold break-keep"
    >
      <span class="text-blue-400 font-semibold">
        {{ comma(targetAmount - summaryAmount) }} {{ $t(`currency.${currencyCode}`) }}
      </span>
      <span>
        {{ $t('share.save') }}
      </span>
    </p>
  </div>
</template>
