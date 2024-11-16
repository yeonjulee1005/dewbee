<script setup lang="ts">
const { width } = useWindowSize()
</script>

<template>
  <div class="flex flex-col gap-y-1.5">
    <div :class="`flex items-baseline ${width > 340 ? 'flex-row gap-2' : 'flex-col gap-2'}`">
      <NuxtImg
        src="/image/favicon.svg"
        :width="width > 340 ? 100 : 50"
        :height="width > 340 ? 100 : 50"
      />
      <p class="text-5xl font-light text-amber-500">
        {{ $t('intro.title') }}
      </p>
    </div>
    <p class="text-lg font-light break-keep">
      {{ $t('intro.subTitle') }}
    </p>
    <USeparator />
  </div>
</template>
