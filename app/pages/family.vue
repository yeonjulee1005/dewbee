<script setup lang="ts">
const { t } = useCustomLocale()

const { url } = useImageStorage()

const { windowSize } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.familyService'),
})
</script>

<template>
  <div class="relative w-full h-fit flex flex-col justify-center gap-y-8 py-4 pb-6">
    <ASubPageTitle :title="$t('pageTitle.familyService')" />
    <div class="w-full flex flex-col items-center gap-y-10 px-6">
      <p class="w-full text-lg font-light break-keep">
        {{ $t('family.description') }}
      </p>
      <div class="flex flex-col gap-y-6">
        <NuxtImg
          class="rounded-full ring-4 ring-amber-400/50"
          :src="url(true, '/assets/dewbee_logo.svg')"
          :width="windowSize > 340 ? 240 : 160"
          :height="windowSize > 340 ? 240 : 160"
        />
        <NuxtImg
          class="rounded-full ring-4 ring-emerald-400/50"
          :src="url(true, '/assets/dewdew_world_logo.png')"
          :width="windowSize > 340 ? 240 : 160"
          :height="windowSize > 340 ? 240 : 160"
        />
      </div>
    </div>
  </div>
</template>
