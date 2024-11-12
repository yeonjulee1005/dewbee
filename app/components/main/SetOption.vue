<script setup lang="ts">
const { t } = useLocale()
const { comma } = useUi()

withDefaults(
  defineProps<{
    spendCount?: number
    targetAmount?: number
    currencyCode?: 'CYC001' | 'CYC002' | 'CYC003'
    endDateCode?: 'EDC001' | 'EDC002' | 'EDC003' | 'EDC004' | 'EDC005' | 'EDC006' | 'EDC007'
  }>(),
  {
    spendCount: 0,
    targetAmount: 0,
    currencyCode: 'CYC001',
    endDateCode: 'EDC001',
  },
)

const situationItem = [
  {
    label: t('main.button'),
    icon: 'i-lucide-check-circle',
    slot: 'button',
  },
]

const situation = defineModel<{ color: 'primary' | 'secondary' | 'success' | 'warning' | 'error', label: string }>('situation', {
  default: () => ({
    color: 'secondary',
    label: '1',
  }),
})

const computedNormalizedColor = computed(() => {
  switch (situation.value.color) {
    case 'primary':
      return 'amber'
    case 'secondary':
      return 'sky'
    case 'success':
      return 'green'
    case 'warning':
      return 'orange'
    case 'error':
      return 'red'
    default:
      return 'amber'
  }
})

console.log(computedNormalizedColor.value)
</script>

<template>
  <div class="w-full flex flex-col items-end gap-y-4">
    <UAccordion
      :items="situationItem"
      :ui="{ root: 'w-full flex justify-end', header: 'w-full flex flex-col items-end' }"
    >
      <template #default>
        <UBadge
          :color="situation.color ?? 'error'"
          variant="subtle"
          size="lg"
          :label="situation.label"
        />
      </template>
      <template #button>
        <div class="w-fit flex flex-col items-end gap-y-1">
          <div class="flex flex-col items-end my-2">
            <div class="flex items-center gap-x-2 text-base sm:text-xl text-light break-keep mb-2">
              <span>
                {{ $t('main.setOption.thisWeekend') }}
              </span>
              <UBadge
                :color="situation.color ?? 'error'"
                variant="outline"
                size="lg"
                :label="$t('text.count', { count: spendCount })"
              />
              <span>
                {{ $t('main.setOption.records') }}
              </span>
            </div>
            <p class="text-sm sm:text-lg break-keep leading-6">
              {{ $t('main.setOption.currentSpendAmount', { amount: comma(targetAmount), currency: $t(`currency.${currencyCode}`) }) }}
            </p>
            <div class="flex items-center gap-x-2 text-sm sm:text-lg break-keep leading-6 mb-2">
              <UBadge
                :color="situation.color ?? 'error'"
                variant="outline"
                size="lg"
                :label="$t('main.setOption.nextWeekend', { endDate: $t(`date.${endDateCode}`) })"
              />
              <span>
                {{ $t('main.setOption.chekable') }}
              </span>
            </div>
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
      </template>
    </UAccordion>
  </div>
</template>
