<template>
  <div class="relative w-dvw h-dvh lg:w-[500px] flex flex-col items-center pb-8">
    <slot />
    <div class="absolute bottom-1 left-0 w-full text-center text-xs font-semibold">
      {{ $t('pageTitle.copyright') }}
    </div>
  </div>
</template>
