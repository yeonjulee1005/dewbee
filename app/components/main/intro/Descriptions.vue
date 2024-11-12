<template>
  <UCard
    :ui="{
      root: 'ring',
      body: 'p-4',
    }"
  >
    <div class="flex flex-col gap-y-4">
      <div class="flex items-baseline gap-x-2">
        <AHelpPopover
          :use-trailing="false"
          custom-class="text-2xl"
          button-color="primary"
          button-variant="ghost"
          :help-label="$t('intro.step1.label')"
        >
          <p class="text-sm text-amber-600 dark:text-amber-400">
            {{ $t('intro.step1.description') }}
          </p>
        </AHelpPopover>
        <p class="text-base">
          {{ $t('intro.step1.title') }}
        </p>
      </div>
      <USeparator />
      <div class="flex items-baseline gap-x-2">
        <AHelpPopover
          :use-trailing="false"
          custom-class="text-2xl"
          button-color="primary"
          button-variant="ghost"
          :help-label="$t('intro.step2.label')"
        >
          <p class="text-sm text-amber-600 dark:text-amber-400">
            {{ $t('intro.step2.description') }}
          </p>
        </AHelpPopover>
        <p class="text-base">
          {{ $t('intro.step2.title') }}
        </p>
      </div>
      <USeparator />
      <div class="flex items-baseline gap-x-2">
        <AHelpPopover
          :use-trailing="false"
          custom-class="text-2xl"
          button-color="primary"
          button-variant="ghost"
          :help-label="$t('intro.step3.label')"
        >
          <p class="text-sm text-amber-600 dark:text-amber-400">
            {{ $t('intro.step3.description') }}
          </p>
        </AHelpPopover>
        <p class="text-base">
          {{ $t('intro.step3.title') }}
        </p>
      </div>
    </div>
  </UCard>
</template>
