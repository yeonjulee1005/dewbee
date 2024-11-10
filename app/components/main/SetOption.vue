<script setup lang="ts">
const { comma } = useUi()

withDefaults(
  defineProps<{
    targetAmount?: number
    currencyCode?: 'CYC001' | 'CYC002' | 'CYC003'
    endDateCode?: 'EDC001' | 'EDC002' | 'EDC003' | 'EDC004' | 'EDC005' | 'EDC006' | 'EDC007'
  }>(),
  {
    targetAmount: 0,
    currencyCode: 'CYC001',
    endDateCode: 'EDC001',
  },
)
</script>

<template>
  <UCard
    :ui="{
      root: 'w-full ring ring-amber-500',
      body: 'p-4',
    }"
  >
    <div class="w-full flex flex-col gap-y-1">
      <p class="text-sm sm:text-xl break-keep leading-7">
        {{ $t('main.settingValue', { amount: comma(targetAmount), currency: $t(`currency.${currencyCode}`), endDate: $t(`date.${endDateCode}`) }) }}
      </p>
      <div class="w-full flex justify-end">
        <AHelpPopover
          icon-custom-class="h-5 w-5 text-neutral-600 dark:text-neutral-400"
          :help-label="$t('button.help')"
        >
          <p
            v-for="(text, index) in $tm('main.help')"
            :key="index"
            class="text-xs font-light text-neutral-600 dark:text-neutral-400 break-keep"
          >
            {{ $rt(text) }}
          </p>
        </AHelpPopover>
      </div>
    </div>
  </UCard>
</template>
