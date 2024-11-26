<script setup lang="ts">
const { t } = useCustomLocale()

const { url } = useImageStorage()

const { windowSize } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.familyService'),
  meta: [{ name: 'description', content: t('pageDescription.familyService') }],
})
</script>

<template>
  <div class="relative w-full h-fit flex flex-col justify-center gap-y-8 py-4 pb-6">
    <ASubPageTitle :title="$t('pageTitle.familyService')" />
    <div class="w-full flex flex-col items-center gap-y-10 px-6">
      <p class="w-full text-lg font-light break-keep">
        {{ $t('family.description') }}
      </p>
      <div class="flex flex-col gap-y-10">
        <NuxtImg
          class="rounded-full ring-4 ring-amber-400/50 cursor-pointer hover:ring-amber-400/70 hover:bg-amber-400/10 transition-all duration-200"
          :src="url(true, '/assets/dewbee_logo.webp')"
          :width="windowSize > 340 ? 240 : 160"
          :height="windowSize > 340 ? 240 : 160"
          loading="lazy"
          placeholder
          format="webp"
          alt="DewBee Logo"
          @click="navigateTo('https://dewbee.dewdew.world', { external: true, open: { target: '_blank' } })"
        />
        <NuxtImg
          class="rounded-full ring-4 ring-sky-400/50 cursor-pointer hover:ring-sky-400/70 hover:bg-sky-400/10 transition-all duration-200"
          :src="url(true, '/assets/monitors_test_logo.webp')"
          :width="windowSize > 340 ? 240 : 160"
          :height="windowSize > 340 ? 240 : 160"
          loading="lazy"
          placeholder
          format="webp"
          alt="Monitors Test Logo"
          @click="navigateTo('https://monitors.dewdew.world', { external: true, open: { target: '_blank' } })"
        />
        <NuxtImg
          class="rounded-full ring-4 ring-emerald-400/50 cursor-pointer hover:ring-emerald-400/70 hover:bg-emerald-400/10 transition-all duration-200"
          :src="url(true, '/assets/dewdew_world_logo.png')"
          :width="windowSize > 340 ? 240 : 160"
          :height="windowSize > 340 ? 240 : 160"
          loading="lazy"
          placeholder
          format="png"
          alt="Dewdew World Logo"
          @click="navigateTo('https://www.dewdew.world', { external: true, open: { target: '_blank' } })"
        />
      </div>
    </div>
  </div>
</template>
