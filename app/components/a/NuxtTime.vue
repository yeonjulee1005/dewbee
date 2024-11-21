<script setup lang="ts">
const { locale } = useCustomLocale()

withDefaults(
  defineProps<{
    dateTime?: string | ComputedRef<string> | null
    fullDateTime?: boolean
    capitalDateTime?: boolean
  }>(),
  {
    dateTime: '',
    fullDateTime: true,
    capitalDateTime: true,
  },
)
</script>

<template>
  <div>
    <NuxtTime
      v-if="fullDateTime"
      :datetime="dateTime"
      :locale="locale"
      :year="capitalDateTime ? 'numeric' : '2-digit'"
      :month="capitalDateTime ? 'numeric' : '2-digit'"
      :day="capitalDateTime ? 'numeric' : '2-digit'"
      :hour="capitalDateTime ? 'numeric' : '2-digit'"
      :minute="capitalDateTime ? 'numeric' : '2-digit'"
      :hour-cycle="capitalDateTime ? 'h23' : 'h12'"
    />
    <!-- :second="capitalDateTime ? 'numeric' : '2-digit'" -->
    <NuxtTime
      v-else
      :datetime="dateTime"
      :locale="locale"
      :year="capitalDateTime ? 'numeric' : '2-digit'"
      :month="capitalDateTime ? 'numeric' : '2-digit'"
      :day="capitalDateTime ? 'numeric' : '2-digit'"
    />
  </div>
</template>
