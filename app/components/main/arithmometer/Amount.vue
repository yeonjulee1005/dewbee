<script setup lang="ts">
const { width } = useWindowSize()

const { t } = useLocale()

const props = withDefaults(
  defineProps<{
    targetAmount?: number
  }>(),
  {
    targetAmount: 0,
  },
)

const emit = defineEmits([
  'add:amount',
  'subtract:amount',
  'exceed:target-amount',
])

const mainSpendAmount = defineModel('mainSpendAmount', {
  type: Number,
  default: 0,
})

const selectKeypadAccordion = ref('0')

const keypadAccordion = [
  {
    label: t('main.button'),
    icon: 'i-lucide-banknote',
    slot: 'button',
  },
]

const manualAccordion = [
  {
    label: t('main.manual'),
    icon: 'i-lucide-keyboard',
    slot: 'manual',
  },
]

const smallCalculatorButton = ref([1, 5, 10, 50])
const computedMediumCalculatorButton = computed(() => {
  return props.targetAmount <= 1000
    ? [100, 500]
    : [100, 500, 1000, 5000]
})
const computedLargeCalculatorButton = computed(() => {
  if (props.targetAmount <= 10000) {
    return []
  }
  else if (props.targetAmount <= 100000) {
    return [10000, 50000]
  }
  else {
    return [10000, 50000, 100000]
  }
})
const computedExtraLargeCalculatorButton = computed(() => {
  if (props.targetAmount <= 100000) {
    return []
  }
  else if (props.targetAmount <= 1000000) {
    return [500000]
  }
  else {
    return [500000, 1000000, 5000000]
  }
})

const updateInput = (value: number) => {
  if (value > props.targetAmount) {
    emit('exceed:target-amount')
    return
  }
}
</script>

<template>
  <div class="w-full flex flex-col items-end gap-y-4">
    <UAccordion
      v-model="selectKeypadAccordion"
      :items="keypadAccordion"
      :ui="{ root: 'w-full flex justify-start', header: 'w-fit', item: 'w-full' }"
    >
      <template #button>
        <div class="w-full flex flex-col gap-y-4">
          <div :class="`grid ${width < 320 ? 'grid-cols-1' : 'grid-cols-2'} sm:grid-cols-4 gap-3`">
            <MainArithmometerCalculatorButton
              :calculator-button="smallCalculatorButton"
              @click:add="() => $emit('add:amount', $event)"
              @click:subtract="() => $emit('subtract:amount', $event)"
            />
          </div>
          <div :class="`grid ${width < 420 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-4 gap-3`">
            <MainArithmometerCalculatorButton
              :calculator-button="computedMediumCalculatorButton"
              @click:add="() => $emit('add:amount', $event)"
              @click:subtract="() => $emit('subtract:amount', $event)"
            />
          </div>
          <div :class="`grid ${width < 460 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3 gap-3`">
            <MainArithmometerCalculatorButton
              :calculator-button="computedLargeCalculatorButton"
              @click:add="() => $emit('add:amount', $event)"
              @click:subtract="() => $emit('subtract:amount', $event)"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MainArithmometerCalculatorButton
              :calculator-button="computedExtraLargeCalculatorButton"
              @click:add="() => $emit('add:amount', $event)"
              @click:subtract="() => $emit('subtract:amount', $event)"
            />
          </div>
          <USeparator />
        </div>
      </template>
    </UAccordion>
    <UAccordion
      :items="manualAccordion"
      :ui="{ header: 'w-fit' }"
    >
      <template #manual>
        <div class="w-full flex justify-end gap-4">
          <UInput
            v-model="mainSpendAmount"
            class="w-full max-w-[300px]"
            type="number"
            :min="0"
            :max="1000000000"
            :step="1000"
            size="xl"
            :ui="{
              base: 'text-right',
            }"
            @update:model-value="(value: string | number) => updateInput(value as number)"
          />
        </div>
      </template>
    </UAccordion>
  </div>
</template>
