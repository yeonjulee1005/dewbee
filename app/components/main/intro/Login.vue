<template>
  <UCard
    :ui="{
      root: 'ring hover:ring-amber-500 hover:text-amber-600 hover:dark:text-amber-400 transition-all duration-200 ease-in-out cursor-pointer',
      body: 'p-4',
    }"
    @click="navigateTo('/login')"
  >
    <p class="text-center text-base font-light">
      {{ $t('intro.login') }}
    </p>
  </UCard>
</template>
