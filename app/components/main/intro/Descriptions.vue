<script setup lang="ts">
const { url } = useImageStorage()

const { windowSize } = storeToRefs(useWindowStore())
</script>

<template>
  <div class="flex flex-col-reverse items-end md:items-center md:flex-row gap-8">
    <div class="md:w-auto w-full flex flex-col gap-y-4 md:flex-1">
      <UCard
        :ui="{
          root: 'ring',
          body: 'p-4',
        }"
      >
        <div class="flex flex-col gap-y-4">
          <div :class="`flex ${windowSize > 340 ? 'flex-row gap-x-2' : 'flex-col gap-y-2'} items-baseline`">
            <AHelpPopover
              :use-trailing="false"
              custom-class="text-2xl"
              button-color="primary"
              button-variant="ghost"
              :help-label="$t('intro.step1.label')"
            >
              <p
                v-for="(text, index) in $tm('intro.step1.description')"
                :key="index"
                class="text-sm text-amber-600 dark:text-amber-400 break-keep"
              >
                {{ $rt(text) }}
              </p>
            </AHelpPopover>
            <p class="text-base break-keep">
              {{ $t('intro.step1.title') }}
            </p>
          </div>
          <USeparator />
          <div :class="`flex ${windowSize > 340 ? 'flex-row gap-x-2' : 'flex-col gap-y-2'} items-baseline`">
            <AHelpPopover
              :use-trailing="false"
              custom-class="text-2xl"
              button-color="primary"
              button-variant="ghost"
              :help-label="$t('intro.step2.label')"
            >
              <p class="text-sm text-amber-600 dark:text-amber-400 break-keep">
                {{ $t('intro.step2.description') }}
              </p>
            </AHelpPopover>
            <p class="text-base break-keep">
              {{ $t('intro.step2.title') }}
            </p>
          </div>
          <USeparator />
          <div :class="`flex ${windowSize > 340 ? 'flex-row gap-x-2' : 'flex-col gap-y-2'} items-baseline`">
            <AHelpPopover
              :use-trailing="false"
              custom-class="text-2xl"
              button-color="primary"
              button-variant="ghost"
              :help-label="$t('intro.step3.label')"
            >
              <p
                v-for="(text, index) in $tm('intro.step3.description')"
                :key="index"
                class="text-sm text-amber-600 dark:text-amber-400 break-keep"
              >
                {{ $rt(text) }}
              </p>
            </AHelpPopover>
            <p class="text-base break-keep">
              {{ $t('intro.step3.title') }}
            </p>
          </div>
        </div>
      </UCard>
      <MainIntroLogin />
    </div>
    <div class="flex justify-center items-center md:flex-1">
      <NuxtImg
        :src="url(true, '/assets/dewbee_logo.svg')"
        class="rounded-full ring-4 ring-amber-500"
        :width="windowSize > 340 ? 300 : 160"
        :height="windowSize > 340 ? 300 : 160"
        alt="DewBEE Logo"
      />
    </div>
  </div>
</template>
