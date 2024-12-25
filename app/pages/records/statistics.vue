<script setup lang="ts">
import { subMonths } from 'date-fns'

const { t } = useCustomLocale()

const { mobileOperationSystem } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.statistics'),
  meta: [{ name: 'description', content: t('pageDescription.statistics') }],
})

definePageMeta({
  middleware: 'auth',
})

const transformData = (transformPayload: Realtime[] | DailyResult[] | WeeklyResult[], statisticsType: 'realtime' | 'daily' | 'weekly') => {
  const chartDateLabel = ref<string[]>([])
  const chartValuesUnit = ref<string[]>([])

  const chartKrwValues = ref<number[]>([])
  const chartUsdValues = ref<number[]>([])
  const chartJpyValues = ref<number[]>([])

  const summaryKrwAmount = ref<number>(0)
  const summaryUsdAmount = ref<number>(0)
  const summaryJpyAmount = ref<number>(0)

  transformPayload.forEach((item: DailyResult | Realtime | WeeklyResult) => {
    switch (item.currency.code) {
      case 'CYC001':
        chartKrwValues.value.unshift(statisticsType === 'realtime' ? (item as Realtime).amount ?? 0 : (item as DailyResult).summary_amount ?? 0)
        summaryKrwAmount.value += statisticsType === 'realtime' ? (item as Realtime).amount ?? 0 : (item as DailyResult).summary_amount ?? 0
        chartUsdValues.value.unshift(0)
        chartJpyValues.value.unshift(0)
        break
      case 'CYC002':
        chartUsdValues.value.unshift(statisticsType === 'realtime' ? (item as Realtime).amount ?? 0 : (item as DailyResult).summary_amount ?? 0)
        summaryUsdAmount.value += statisticsType === 'realtime' ? (item as Realtime).amount ?? 0 : (item as DailyResult).summary_amount ?? 0
        chartKrwValues.value.unshift(0)
        chartJpyValues.value.unshift(0)
        break
      case 'CYC003':
        chartJpyValues.value.unshift(statisticsType === 'realtime' ? (item as Realtime).amount ?? 0 : (item as DailyResult).summary_amount ?? 0)
        summaryJpyAmount.value += statisticsType === 'realtime' ? (item as Realtime).amount ?? 0 : (item as DailyResult).summary_amount ?? 0
        chartKrwValues.value.unshift(0)
        chartUsdValues.value.unshift(0)
        break
    }

    chartDateLabel.value.unshift(item.created_at ?? '')
    chartValuesUnit.value.unshift(item.currency.code ?? '')
  })

  return { chartDateLabel, chartKrwValues, chartUsdValues, chartJpyValues, chartValuesUnit, summaryKrwAmount, summaryUsdAmount, summaryJpyAmount }
}

const { data: statisticsRealtimeSpendData, pending: pendingStatisticsRealtimeSpendData } = await useAsyncData('statisticsRealtimeSpendData', async () => {
  const oneMonthAgo = subMonths(new Date(), 1).toISOString()

  const { data }: SerializeObject = await useFetch('/api/range', {
    query: {
      tableName: 'viewSpendList',
      startDate: oneMonthAgo,
      endDate: new Date().toISOString(),
    },
    headers: useRequestHeaders(['cookie']),
    transform: (payload: SerializeObject) => {
      if (payload) {
        return transformData(payload.data, 'realtime')
      }
    },
  })

  return data.value
}, {
  dedupe: 'defer',
  deep: true,
})

const { data: statisticsDailyResultData, pending: pendingStatisticsDailyResultData } = await useAsyncData('statisticsDailyResultData', async () => {
  const { data }: SerializeObject = await useFetch('/api/statistics', {
    query: {
      tableName: 'viewDailyResultList',
    },
    headers: useRequestHeaders(['cookie']),
    transform: (payload: SerializeObject) => {
      if (payload) {
        return transformData(payload, 'daily')
      }
    },
  })

  return data.value
}, {
  dedupe: 'defer',
  deep: true,
})

const { data: statisticsWeeklyResultData, pending: pendingStatisticsWeeklyResultData } = await useAsyncData('statisticsWeeklyResultData', async () => {
  const { data }: SerializeObject = await useFetch('/api/statistics', {
    query: {
      tableName: 'viewWeeklyResultList',
    },
    headers: useRequestHeaders(['cookie']),
    transform: (payload: SerializeObject) => {
      if (payload) {
        return transformData(payload, 'weekly')
      }
    },
  })

  return data.value
}, {
  dedupe: 'defer',
  deep: true,
})
</script>

<template>
  <div
    v-if="!pendingStatisticsRealtimeSpendData && !pendingStatisticsDailyResultData && !pendingStatisticsWeeklyResultData"
    class="relative w-full h-fit flex flex-col justify-center gap-y-8 pt-4 pb-6"
    :class="{ 'mt-10': mobileOperationSystem === 'android' }"
  >
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
        v-if="statisticsRealtimeSpendData?.chartDateLabel.length > 0"
        :statistics-type="'realtime'"
        :chart-date-label="statisticsRealtimeSpendData?.chartDateLabel"
        :chart-values-unit="statisticsRealtimeSpendData?.chartValuesUnit"
        :chart-krw-value="statisticsRealtimeSpendData?.chartKrwValues"
        :chart-usd-value="statisticsRealtimeSpendData?.chartUsdValues"
        :chart-jpy-value="statisticsRealtimeSpendData?.chartJpyValues"
      />
      <div
        v-else
        class="w-full flex justify-center"
      >
        <DbCard
          :ui="{
            root: 'w-full h-40 ring ring-neutral-400 dark:ring-neutral-600',
            body: 'h-full flex items-center justify-center break-keep',
          }"
        >
          <p class="text-center">
            {{ $t('statistics.noRealtime') }}
          </p>
        </DbCard>
      </div>
    </div>
    <div class="w-full flex flex-col gap-y-4 px-6">
      <p class="text-lg font-semibold">
        {{ $t('statistics.daily') }}
      </p>
      <ChartSmoothLine
        v-if="statisticsDailyResultData?.chartDateLabel.length > 0"
        :statistics-type="'daily'"
        :chart-date-label="statisticsDailyResultData?.chartDateLabel"
        :chart-values-unit="statisticsDailyResultData?.chartValuesUnit"
        :chart-krw-value="statisticsDailyResultData?.chartKrwValues"
        :chart-usd-value="statisticsDailyResultData?.chartUsdValues"
        :chart-jpy-value="statisticsDailyResultData?.chartJpyValues"
      />
      <div
        v-else
        class="w-full flex justify-center"
      >
        <DbCard
          :ui="{
            root: 'w-full h-40 ring ring-neutral-400 dark:ring-neutral-600',
            body: 'h-full flex items-center justify-center break-keep',
          }"
        >
          <p class="text-center">
            {{ $t('statistics.noDaily') }}
          </p>
        </DbCard>
      </div>
    </div>
    <div class="w-full flex flex-col gap-y-4 px-6">
      <p class="text-lg font-semibold">
        {{ $t('statistics.weekly') }}
      </p>
      <ChartSmoothLine
        v-if="statisticsWeeklyResultData?.chartDateLabel.length > 0"
        :statistics-type="'weekly'"
        :chart-date-label="statisticsWeeklyResultData?.chartDateLabel"
        :chart-values-unit="statisticsWeeklyResultData?.chartValuesUnit"
        :chart-krw-value="statisticsWeeklyResultData?.chartKrwValues"
        :chart-usd-value="statisticsWeeklyResultData?.chartUsdValues"
        :chart-jpy-value="statisticsWeeklyResultData?.chartJpyValues"
      />
      <div
        v-else
        class="w-full flex justify-center"
      >
        <DbCard
          :ui="{
            root: 'w-full h-40 ring ring-neutral-400 dark:ring-neutral-600',
            body: 'h-full flex items-center justify-center break-keep',
          }"
        >
          <p class="text-center">
            {{ $t('statistics.noWeekly') }}
          </p>
        </DbCard>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex justify-center items-center h-screen"
  >
    <Icon
      name="i-svg-spinners-pulse-multiple"
      class="w-28 h-28"
    />
  </div>
</template>
