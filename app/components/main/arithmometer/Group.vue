<script setup lang="ts">
const { t } = useLocale()
const toast = useToast()

const { spendCategoryCodeList } = storeToRefs(useFilterDataStore())

const props = withDefaults(
  defineProps<{
    currencyCode?: 'CYC001' | 'CYC002' | 'CYC003'
    targetAmount?: number
  }>(),
  {
    currencyCode: 'CYC001',
    targetAmount: 0,
  },
)

defineEmits([
  'save:spend-amount',
])

const mainSpendCategoryCode = defineModel('mainSpendCategoryCode', {
  type: String,
  default: '',
})

const mainSpendAmount = defineModel('mainSpendAmount', {
  type: Number,
  default: 0,
})

const selectCategory = (selectCategoryCode: string) => {
  if (mainSpendCategoryCode.value === selectCategoryCode) {
    mainSpendCategoryCode.value = ''
    return
  }

  mainSpendCategoryCode.value = selectCategoryCode
}

const addAmount = (amount: number) => {
  if (mainSpendAmount.value + amount > props.targetAmount) {
    exceedTargetAmount()
  }

  mainSpendAmount.value += amount
}

const subtractAmount = (amount: number) => {
  if (mainSpendAmount.value - amount < 0) {
    mainSpendAmount.value = 0
    return
  }

  if (mainSpendAmount.value - amount > props.targetAmount) {
    exceedTargetAmount()
    return
  }

  mainSpendAmount.value -= amount
}

const exceedTargetAmount = () => {
  toast.add({
    title: t('message.exceedTargetAmount.title'),
    description: t('message.exceedTargetAmount.description'),
    color: 'error',
    actions: [{
      icon: 'i-lucide-trash',
      label: t('button.clear'),
      color: 'error',
      size: 'lg',
      variant: 'outline',
      onClick: () => clearSpendAmount(),
    }],
  })
}

const clearSpendAmount = () => {
  if (mainSpendAmount.value === 0) {
    return
  }

  mainSpendAmount.value = 0
}

const clearArithmometer = () => {
  clearSpendAmount()
  mainSpendCategoryCode.value = ''
}

const computedSpendCategoryName = computed(() => {
  return spendCategoryCodeList.value.find(item => item.code === mainSpendCategoryCode.value)?.code_name ?? ''
})
</script>

<template>
  <UCard
    :ui="{
      root: 'w-full ring-2',
      header: 'w-full',
      body: 'p-4',
    }"
  >
    <template #header>
      <div class="w-full flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        <div class="grid justify-items-center grid-cols-3 gap-3">
          <ATooltipButton
            v-for="(currency, index) in spendCategoryCodeList"
            :key="index"
            use-leading
            custom-class="w-fit"
            button-size="xl"
            :button-color="mainSpendCategoryCode === currency.code ? 'primary' : 'neutral'"
            :button-variant="mainSpendCategoryCode === currency.code ? 'subtle' : 'outline'"
            :icon-lead-name="currency?.icon_name ?? ''"
            icon-lead-class="w-7 h-7"
            :tooltip-text="currency?.code_name ?? ''"
            @click:button="selectCategory(currency?.code ?? '')"
          />
        </div>
        <MainArithmometerDisplay
          :spend-category-code="mainSpendCategoryCode"
          :spend-category-name="computedSpendCategoryName"
          :spend-amount="mainSpendAmount"
          :currency-code="currencyCode"
        />
      </div>
    </template>
    <MainArithmometerAmount
      v-model:main-spend-amount="mainSpendAmount"
      :target-amount="targetAmount"
      @add:amount="addAmount"
      @subtract:amount="subtractAmount"
      @exceed:target-amount="exceedTargetAmount"
    />
    <template #footer>
      <div class="w-full flex justify-end">
        <div
          v-if="mainSpendCategoryCode && mainSpendAmount"
          class="h-12 flex gap-x-2"
        >
          <AButton
            button-size="xl"
            button-color="neutral"
            button-variant="outline"
            :button-text="$t('button.clear')"
            @click="clearArithmometer"
          />
          <AButton
            button-size="xl"
            button-color="primary"
            button-variant="subtle"
            :button-text="$t('button.save')"
            @click="() => $emit('save:spend-amount')"
          />
        </div>
        <ol
          v-else
          class="w-full"
        >
          <li
            v-for="(text, index) in $tm('main.notifications')"
            :key="index"
            class="list-disc ml-2 text-sm break-keep text-neutral-600 dark:text-neutral-400 leading-5 mt-1"
          >
            {{ $rt(text) }}
          </li>
        </ol>
      </div>
    </template>
  </UCard>
</template>
