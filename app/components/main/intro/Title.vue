<template>
  <div class="flex flex-col gap-y-1.5">
    <div class="flex items-baseline gap-x-4">
      <NuxtImg
        src="/image/favicon.svg"
        width="100"
        height="100"
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
