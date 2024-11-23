<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from 'chart.js'

const { t } = useCustomLocale()
const { comma, transformChartDate } = useUi()

const { userData } = storeToRefs(useUserDataStore())

const props = withDefaults(
  defineProps<{
    statisticsType?: 'realtime' | 'daily' | 'weekly' | ''
    chartDateLabel?: string[]
    chartValuesUnit?: string[]
    chartKrwValue?: number[]
    chartUsdValue?: number[]
    chartJpyValue?: number[]
  }>(),
  {
    statisticsType: '',
    chartDateLabel: () => [],
    chartValuesUnit: () => [],
    chartKrwValue: () => [],
    chartUsdValue: () => [],
    chartJpyValue: () => [],
  },
)

const data = ref<LineChartData>({
  labels: props.chartDateLabel,
  datasets: [],
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        title: (tooltipItem: any[]) => {
          return transformChartDate(tooltipItem[0].label)
        },
        label: (tooltipItem: any) => {
          return !tooltipItem.raw
            ? t('text.noSpend')
            : comma(tooltipItem.raw as number).concat(' ', t(`currency.${props.chartValuesUnit[tooltipItem.dataIndex] ?? 'CYC001'}`))
        },
      },
    },
  },
  scales: {
    x: {
      offset: true,
      grid: {
        display: false,
        lineWidth: 0,
      },
      ticks: {
        padding: 10,
        callback: (tickValue: string | number, index: number, ticks: any[]) => {
          if (index === 0) {
            return transformChartDate(data.value.labels[0])
          }
          if (index === ticks.length - 1) {
            return transformChartDate(data.value.labels[index])
          }
        },
      },
    },
    y: {
      grid: {
        display: false,
        lineWidth: 0,
      },
      border: {
        display: false,
      },
      ticks: {
        font: {
          size: 16,
          family: 'Source Code Pro',
        },
        padding: 10,
        callback: (tickValue: string | number, index: number, ticks: any[]) => {
          if (index === ticks.length - 1) {
            return comma(tickValue as number).concat(t(`currency.${userData.value?.currency.code ?? 'CYC001'}`))
          }
          if (tickValue === 0) {
            return '0'.concat(t(`currency.${userData.value?.currency.code ?? 'CYC001'}`))
          }
          return ''
        },
      },
      // display: false,
    },
    y1: {
      display: false,
    },
  },
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
)

const computedChartColor = (currencyCode: string) => {
  switch (props.statisticsType) {
    case 'realtime':
      switch (currencyCode) {
        case 'CYC001':
          return '#fb7185'
        case 'CYC002':
          return '#a78bfa'
        case 'CYC003':
          return '#34d399'
        default:
          return '#fb7185'
      }
      break
    case 'daily':
      switch (currencyCode) {
        case 'CYC001':
          return '#e28255'
        case 'CYC002':
          return '#4fa8e1'
        case 'CYC003':
          return '#9d8eeb'
        default:
          return '#e28255'
      }
      break
    case 'weekly':
      switch (currencyCode) {
        case 'CYC001':
          return '#b79b80'
        case 'CYC002':
          return '#d2aa97'
        case 'CYC003':
          return '#bc927b'
        default:
          return '#b79b80'
      }
      break
    default:
      return '#fb7185'
  }
}

const inputLineChartData = () => {
  const findKrwValue = props.chartKrwValue.find((item: number) => item !== 0)
  const findUsdValue = props.chartUsdValue.find((item: number) => item !== 0)
  const findJpyValue = props.chartJpyValue.find((item: number) => item !== 0)

  if (findKrwValue) {
    data.value.datasets.push({
      data: props.chartKrwValue,
      label: t('text.CYC001'),
      borderWidth: 2,
      borderColor: computedChartColor('CYC001'),
      tension: 0.4,
      pointRadius: 2,
      pointHitRadius: 20,
      pointBackgroundColor: computedChartColor('CYC001'),
      fill: false,
    })
  }

  if (findUsdValue) {
    data.value.datasets.push({
      data: props.chartUsdValue,
      label: t('text.CYC002'),
      borderWidth: 2,
      borderColor: computedChartColor('CYC002'),
      tension: 0.4,
      pointRadius: 2,
      pointHitRadius: 20,
      pointBackgroundColor: computedChartColor('CYC002'),
      fill: false,
    })
  }

  if (findJpyValue) {
    data.value.datasets.push({
      data: props.chartJpyValue,
      label: t('text.CYC003'),
      borderWidth: 2,
      borderColor: computedChartColor('CYC003'),
      tension: 0.4,
      pointRadius: 2,
      pointHitRadius: 20,
      pointBackgroundColor: computedChartColor('CYC003'),
      fill: false,
    })
  }
}

inputLineChartData()
</script>

<template>
  <div class="w-full h-[200px]">
    <Line
      :data="data"
      :options="options"
    />
  </div>
</template>
