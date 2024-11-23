<script setup lang="ts">
import { subMonths } from 'date-fns'

const { t } = useCustomLocale()

const { userData } = storeToRefs(useUserDataStore())

const { orderFetchData, fetchRangeData } = useFetchComposable()

useHead({
  title: t('pageTitle.statistics'),
})

definePageMeta({
  middleware: 'auth',
})

const oneMonthAgo = subMonths(new Date(), 1).toISOString()

const { data: statisticsRealtimeSpendData } = await useAsyncData('statisticsRealtimeSpendData', async () => {
  const response: SerializeObject = await fetchRangeData('viewSpendList', '*', 'created_at', new Date().toISOString(), 'created_at', oneMonthAgo, false, 'update_user_id', userData.value?.id ?? '')

  const chartDateLabel = ref<string[]>([])
  const chartValuesUnit = ref<string[]>([])

  const chartKrwValues = ref<number[]>([])
  const chartUsdValues = ref<number[]>([])
  const chartJpyValues = ref<number[]>([])

  if (response) {
    response.data.forEach((item: Realtime) => {
      switch (item.currency.code) {
        case 'CYC001':
          chartKrwValues.value.unshift(item.amount ?? 0)
          chartUsdValues.value.unshift(0)
          chartJpyValues.value.unshift(0)
          break
        case 'CYC002':
          chartUsdValues.value.unshift(item.amount ?? 0)
          chartKrwValues.value.unshift(0)
          chartJpyValues.value.unshift(0)
          break
        case 'CYC003':
          chartJpyValues.value.unshift(item.amount ?? 0)
          chartKrwValues.value.unshift(0)
          chartUsdValues.value.unshift(0)
          break
      }

      chartDateLabel.value.unshift(item.created_at ?? '')
      chartValuesUnit.value.unshift(item.currency.code ?? '')
    })
  }

  return { chartDateLabel, chartKrwValues, chartUsdValues, chartJpyValues, chartValuesUnit }
}, {
  immediate: true,
})

const { data: statisticsDailyResultData } = await useAsyncData('statisticsDailyResultData', async () => {
  const response: SerializeObject = await orderFetchData('viewDailyResultList', '*', 'created_at', false, 'update_user_id', userData.value?.id ?? '')

  const chartDateLabel = ref<string[]>([])
  const chartValuesUnit = ref<string[]>([])

  const chartKrwValues = ref<number[]>([])
  const chartUsdValues = ref<number[]>([])
  const chartJpyValues = ref<number[]>([])

  if (response) {
    response.forEach((item: DailyResult) => {
      switch (item.currency.code) {
        case 'CYC001':
          chartKrwValues.value.unshift(item.summary_amount ?? 0)
          chartUsdValues.value.unshift(0)
          chartJpyValues.value.unshift(0)
          break
        case 'CYC002':
          chartUsdValues.value.unshift(item.summary_amount ?? 0)
          chartKrwValues.value.unshift(0)
          chartJpyValues.value.unshift(0)
          break
        case 'CYC003':
          chartJpyValues.value.unshift(item.summary_amount ?? 0)
          chartKrwValues.value.unshift(0)
          chartUsdValues.value.unshift(0)
          break
      }

      chartDateLabel.value.unshift(item.created_at ?? '')
      chartValuesUnit.value.unshift(item.currency.code ?? '')
    })
  }

  return { chartDateLabel, chartKrwValues, chartUsdValues, chartJpyValues, chartValuesUnit }
}, {
  immediate: true,
})

const { data: statisticsWeeklyResultData } = await useAsyncData('statisticsWeeklyResultData', async () => {
  const response: SerializeObject = await orderFetchData('viewWeeklyResultList', '*', 'created_at', false, 'update_user_id', userData.value?.id ?? '')

  const chartDateLabel = ref<string[]>([])
  const chartValuesUnit = ref<string[]>([])

  const chartKrwValues = ref<number[]>([])
  const chartUsdValues = ref<number[]>([])
  const chartJpyValues = ref<number[]>([])

  if (response) {
    response.forEach((item: WeeklyResult) => {
      switch (item.currency.code) {
        case 'CYC001':
          chartKrwValues.value.unshift(item.summary_amount ?? 0)
          chartUsdValues.value.unshift(0)
          chartJpyValues.value.unshift(0)
          break
        case 'CYC002':
          chartUsdValues.value.unshift(item.summary_amount ?? 0)
          chartKrwValues.value.unshift(0)
          chartJpyValues.value.unshift(0)
          break
        case 'CYC003':
          chartJpyValues.value.unshift(item.summary_amount ?? 0)
          chartKrwValues.value.unshift(0)
          chartUsdValues.value.unshift(0)
          break
      }

      chartDateLabel.value.unshift(item.created_at ?? '')
      chartValuesUnit.value.unshift(item.currency.code ?? '')
    })
  }

  return { chartDateLabel, chartKrwValues, chartUsdValues, chartJpyValues, chartValuesUnit }
}, {
  immediate: true,
})
</script>

<template>
  <div class="relative w-full h-fit flex flex-col justify-center gap-y-8 py-4 pb-6">
    <ASubPageTitle
      :title="$t('pageTitle.statistics')"
      title-class="text-2xl font-semibold"
      avatar-size="md"
    />
    <div class="w-full flex flex-col gap-y-4 px-6">
      <p class="text-lg font-semibold">
        {{ $t('statistics.realtime') }}
      </p>
      <ChartSmoothLine
        :statistics-type="'realtime'"
        :chart-date-label="statisticsRealtimeSpendData?.chartDateLabel.value"
        :chart-values-unit="statisticsRealtimeSpendData?.chartValuesUnit.value"
        :chart-krw-value="statisticsRealtimeSpendData?.chartKrwValues.value"
        :chart-usd-value="statisticsRealtimeSpendData?.chartUsdValues.value"
        :chart-jpy-value="statisticsRealtimeSpendData?.chartJpyValues.value"
      />
    </div>
    <div class="w-full flex flex-col gap-y-4 px-6">
      <p class="text-lg font-semibold">
        {{ $t('statistics.daily') }}
      </p>
      <ChartSmoothLine
        :statistics-type="'daily'"
        :chart-date-label="statisticsDailyResultData?.chartDateLabel.value"
        :chart-values-unit="statisticsDailyResultData?.chartValuesUnit.value"
        :chart-krw-value="statisticsDailyResultData?.chartKrwValues.value"
        :chart-usd-value="statisticsDailyResultData?.chartUsdValues.value"
        :chart-jpy-value="statisticsDailyResultData?.chartJpyValues.value"
      />
    </div>
    <div class="w-full flex flex-col gap-y-4 px-6">
      <p class="text-lg font-semibold">
        {{ $t('statistics.weekly') }}
      </p>
      <ChartSmoothLine
        :statistics-type="'weekly'"
        :chart-date-label="statisticsWeeklyResultData?.chartDateLabel.value"
        :chart-values-unit="statisticsWeeklyResultData?.chartValuesUnit.value"
        :chart-krw-value="statisticsWeeklyResultData?.chartKrwValues.value"
        :chart-usd-value="statisticsWeeklyResultData?.chartUsdValues.value"
        :chart-jpy-value="statisticsWeeklyResultData?.chartJpyValues.value"
      />
    </div>
  </div>
</template>
