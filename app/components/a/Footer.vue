<script setup lang="ts">
const copyright = ref('Copyright 2024 © Dewdew All Rights Reserved.')

const dewdewWorld = ref({
  name: 'Dewdew World',
  url: 'https://www.dewdew.world',
})

const dewdew = ref({
  name: 'Dewdew',
  url: 'https://www.dewdew.dev',
})
</script>

<template>
  <div class="w-full text-right text-xs px-2 py-1">
    <p class="break-keep mt-0.5">
      {{ copyright }}
    </p>
    <div class="flex justify-end items-center gap-x-4 mt-0.5">
      <ULink
        :to="dewdewWorld.url"
        external
        target="_blank"
        inactive-class="text-sky-400 dark:text-sky-600"
      >
        {{ dewdewWorld.name }}
      </ULink>
      <USeparator
        class="h-2"
        orientation="vertical"
        color="info"
      />
      <ULink
        :to="dewdew.url"
        external
        target="_blank"
        inactive-class="text-sky-400 dark:text-sky-600"
      >
        {{ dewdew.name }}
      </ULink>
    </div>
  </div>
</template>
