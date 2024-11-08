<script setup lang="ts">
const staticTexts = reactive({
  largeText: '404',
  title: 'Not Found!',
  description: '페이지를 찾을 수 없어요!',
  button: 'Home',
})
</script>

<template>
  <NuxtLayout>
    <div class="w-full h-screen flex flex-col items-center justify-center gap-6">
      <div class="w-4/5 flex flex-col gap-y-1 border-2 p-4 rounded-lg">
        <div class="text-5xl sm:text-8xl font-bold">
          {{ staticTexts.largeText }}
        </div>
        <p class="text-lg sm:text-2xl font-bold">
          {{ staticTexts.title }}
        </p>
        <p class="text-sm sm:text-lg font-bold">
          {{ staticTexts.description }}
        </p>
        <NuxtLink
          class="flex items-center justify-center w-full mx-auto mt-6 text-lg font-bold border-2 px-1.5 py-1 hover:border-green-500 rounded-lg transition ease-in-out"
          to="/"
        >
          {{ staticTexts.button }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
