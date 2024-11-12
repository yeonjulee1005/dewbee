<script setup lang="ts">
const { t } = useLocale()
const { comma } = useUi()

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

const accordionItem = [
  {
    label: t('main.button'),
    icon: 'i-lucide-banknote',
    slot: 'button',
  },
]

const computedCalculatorButton = computed(() => {
  if (props.targetAmount <= 1000) {
    return [1, 5, 10, 50, 100, 500]
  }
  else if (props.targetAmount <= 10000) {
    return [10, 50, 100, 500, 1000, 5000]
  }
  else if (props.targetAmount <= 100000) {
    return [10, 50, 100, 500, 1000, 5000, 10000, 50000]
  }
  else if (props.targetAmount <= 1000000) {
    return [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000]
  }
  else {
    return [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000]
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
      :items="accordionItem"
      :ui="{ root: 'w-full flex justify-start', header: 'w-fit' }"
    >
      <template #button>
        <div class="w-full flex flex-col gap-y-3">
          <div class="flex flex-wrap gap-2">
            <UButtonGroup
              v-for="(button, index) in computedCalculatorButton"
              :key="index"
              button-size="xl"
            >
              <AButton
                button-size="xl"
                button-variant="subtle"
                button-color="secondary"
                :button-text="'+'.concat(comma(button).toString())"
                @click="() => $emit('add:amount', button)"
              />
              <AButton
                button-size="xl"
                button-variant="outline"
                button-color="neutral"
                :button-text="'-'.concat(comma(button).toString())"
                @click="() => $emit('subtract:amount', button)"
              />
            </UButtonGroup>
          </div>
          <USeparator />
        </div>
      </template>
    </UAccordion>
    <div class="w-full flex items-center justify-between gap-x-2">
      <div class="flex items-center gap-x-1.5">
        <Icon
          name="i-lucide-keyboard"
          class="w-5 h-5"
        />
        <p class="text-sm">
          {{ $t('main.manual') }}
        </p>
      </div>
      <UInput
        v-model="mainSpendAmount"
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
  </div>
</template>
