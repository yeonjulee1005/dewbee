<script setup lang="ts">
const { comma } = useUi()

const props = withDefaults(
  defineProps<{
    targetAmount?: number
  }>(),
  {
    targetAmount: 0,
  },
)

defineEmits([
  'add:amount',
  'subtract:amount',
])

const mainSpendAmount = defineModel('mainSpendAmount', {
  type: Number,
  default: 0,
})

const computedCalculatorButton = computed(() => {
  if (props.targetAmount <= 1000) {
    return [1, 5, 10, 50, 100, 500]
  }
  else if (props.targetAmount <= 10000) {
    return [50, 100, 500, 1000, 5000]
  }
  else if (props.targetAmount <= 100000) {
    return [50, 100, 500, 1000, 5000, 10000, 50000]
  }
  else if (props.targetAmount <= 1000000) {
    return [50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000]
  }
  else {
    return [50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000]
  }
})
</script>

<template>
  <div class="w-full flex flex-col items-end gap-y-4">
    <div class="w-full flex flex-col gap-y-3">
      <div class="flex flex-wrap gap-2">
        <AButton
          v-for="(button, index) in computedCalculatorButton"
          :key="index"
          button-size="xl"
          button-variant="outline"
          button-color="secondary"
          :button-text="'+'.concat(comma(button).toString())"
          @click="() => $emit('add:amount', button)"
        />
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-2">
        <AButton
          v-for="(button, index) in computedCalculatorButton"
          :key="index"
          button-size="xl"
          button-variant="outline"
          button-color="error"
          :button-text="'-'.concat(comma(button).toString())"
          @click="() => $emit('subtract:amount', button)"
        />
      </div>
      <USeparator />
    </div>
    <div class="flex items-center gap-x-2">
      <UFormField :label="$t('main.manual')">
        <UInput
          v-model="mainSpendAmount"
          type="number"
          :min="0"
          :step="1000"
          size="xl"
          :ui="{
            base: 'text-right',
          }"
        />
      </UFormField>
    </div>
  </div>
</template>
