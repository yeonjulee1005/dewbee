<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'

const { comma, transformChartDate } = useUi()

const props = withDefaults(
  defineProps<{
    latestChartLabel?: string[]
    chartValue?: number[]
  }>(),
  {
    latestChartLabel: () => [],
    chartValue: () => [],
  },
)

const data = {
  labels: props.latestChartLabel,
  datasets: [
    {
      data: props.chartValue,
      borderColor: '#f87979',
      tension: 0.4,
      pointRadius: 2,
      pointHitRadius: 20,
      pointBackgroundColor: '#f87979',
      fill: false,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        title: (tooltipItem: any[]) => {
          return transformChartDate(tooltipItem[0].label)
        },
        label: (tooltipItem: any) => {
          return comma(tooltipItem.raw as number).concat('원')
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
            return transformChartDate(data.labels[0])
          }
          if (index === ticks.length - 1) {
            return transformChartDate(data.labels[index])
          }
        },
      },
    },
    y: {
      min: -5,
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
            return comma(tickValue as number)
          }
          return ''
        },
      },
    },
  },
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
)
</script>

<template>
  <div class="w-full h-fit px-6">
    <Line
      :data="data"
      :options="options"
    />
  </div>
</template>
