<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: '',
  },
)
</script>

<template>
  <div class="w-[calc(100%-3rem)] flex flex-col gap-y-2.5">
    <p class="text-3xl font-bold">
      {{ title }}
    </p>
    <USeparator
      size="lg"
      :avatar="{ src: '/image/favicon.svg', size: 'lg' }"
    />
  </div>
</template>
