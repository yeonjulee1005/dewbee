<script setup lang="ts">
const { t } = useCustomLocale()

const { userData } = storeToRefs(useUserDataStore())

const { orderFetchData } = useFetchComposable()

useHead({
  title: t('pageTitle.statistics'),
})

definePageMeta({
  middleware: 'auth',
})

const { data: statisticsRealtimeSpendData } = await useAsyncData('statisticsRealtimeSpendData', async () => {
  const response: SerializeObject = await orderFetchData('viewSpendList', '*', 'update_user_id', userData.value?.id ?? '')

  const lastChartLabel = ref<string[]>([])
  const chartValues = ref<number[]>([])

  if (response) {
    response.forEach((item: Realtime) => {
      lastChartLabel.value.unshift(item.created_at ?? '')
      chartValues.value.unshift(item.amount ?? 0)
    })
  }

  return { lastChartLabel, chartValues }
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
    <ChartSmoothLine
      :latest-chart-label="statisticsRealtimeSpendData?.lastChartLabel.value"
      :chart-value="statisticsRealtimeSpendData?.chartValues.value"
    />
  </div>
</template>
