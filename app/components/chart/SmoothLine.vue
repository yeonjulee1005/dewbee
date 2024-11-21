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

const { comma } = useUi()

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
  scales: {
    x: {
      offset: true,
      grid: {
        display: false,
        lineWidth: 0,
      },
      ticks: {
        padding: 10,
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
          size: 18,
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
  <div class="w-full h-[200px]">
    <Line
      :data="data"
      :options="options"
    />
  </div>
</template>
