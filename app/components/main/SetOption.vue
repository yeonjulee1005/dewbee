<script setup lang="ts">
const { t } = useCustomLocale()
const { comma } = useUi()

const { userData } = storeToRefs(useUserDataStore())

const props = withDefaults(
  defineProps<{
    spendList?: Database['public']['Views']['viewSpendList']['Row'][]
    spendCount?: number
  }>(),
  {
    spendList: () => [],
    spendCount: 0,
  },
)

const emit = defineEmits([
  'execute:spend-list',
])

const situationItem = [
  {
    slot: 'button',
  },
]

const computedSpendSituation = computed(() => {
  let amount = 0
  let theme: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'secondary'
  let color = 'text-blue-400'
  let label = t('main.situation.excellent')
  let icon = 'i-lucide-check-circle'

  if (!props.spendList.length) {
    emit('execute:spend-list')
  }

  props.spendList.forEach((item: Database['public']['Views']['viewSpendList']['Row']) => {
    amount += item.amount ?? 0
  })

  const targetAmount = userData.value?.weekly_target_amount
  const percentage = (amount / targetAmount) * 100

  if (percentage <= 25) {
    theme = 'secondary'
    color = 'text-blue-400'
    label = t('main.situation.excellent')
    icon = 'i-fluent-emoji-high-contrast-grinning-squinting-face'
  }
  else if (percentage <= 50) {
    theme = 'success'
    color = 'text-green-400'
    label = t('main.situation.good')
    icon = 'i-fluent-emoji-high-contrast-kissing-face-with-closed-eyes'
  }
  else if (percentage <= 75) {
    theme = 'warning'
    color = 'text-yellow-400'
    label = t('main.situation.warning')
    icon = 'i-fluent-emoji-high-contrast-grinning-face-with-sweat'
  }
  else if (percentage <= 100) {
    theme = 'primary'
    color = 'text-amber-400'
    label = t('main.situation.danger')
    icon = 'i-fluent-emoji-high-contrast-crying-face'
  }
  else {
    theme = 'error'
    color = 'text-red-400'
    label = t('main.situation.over')
    icon = 'i-fluent-emoji-high-contrast-face-screaming-in-fear'
  }

  return { theme, color, label, icon }
})
</script>

<template>
  <DbAccordion
    :items="situationItem"
    :ui="{
      root: 'w-fit flex justify-start z-20',
      header: 'w-full min-w-[240px] flex-col items-end',
      trailingIcon: 'size-8',
    }"
  >
    <template #leading>
      <Icon
        :name="computedSpendSituation.icon"
        :class="`w-8 h-8 ${computedSpendSituation.color}`"
      />
    </template>
    <template #default>
      <DbBadge
        class="ml-1.5"
        :color="computedSpendSituation.theme ?? 'error'"
        variant="subtle"
        size="lg"
        :label="computedSpendSituation.label"
      />
    </template>
    <template #button>
      <div class="w-fit flex flex-col items-end gap-y-1">
        <div class="flex flex-col items-start my-2">
          <div class="flex items-center gap-x-2 text-base sm:text-xl text-light break-keep mb-1">
            <span>
              {{ $t('main.setOption.thisWeekend') }}
            </span>
            <DbBadge
              :color="computedSpendSituation.theme ?? 'error'"
              variant="outline"
              size="lg"
              :label="$t('text.count', { count: spendCount })"
            />
            <span>
              {{ $t('main.setOption.records') }}
            </span>
          </div>
          <p class="text-sm sm:text-lg break-keep leading-7 mb-1">
            {{ $t('main.setOption.currentSpendAmount', { amount: comma(userData?.weekly_target_amount ?? 0), currency: $t(`currency.${userData?.currency?.code}`) }) }}
          </p>
          <div class="flex items-center gap-x-2 text-sm sm:text-lg break-keep leading-6 mb-2">
            <DbBadge
              :color="computedSpendSituation.theme ?? 'error'"
              variant="outline"
              size="lg"
              :label="$t('main.setOption.nextWeekend', { endDate: $t(`date.${userData?.endDate.code}`) })"
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
  </DbAccordion>
</template>
