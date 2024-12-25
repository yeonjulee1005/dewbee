<script setup lang="ts">
const { comma } = useUi()

withDefaults(
  defineProps<{
    calculatorButton?: number[]
  }>(),
  {
    calculatorButton: () => [],
  },
)

defineEmits([
  'click:add',
  'click:subtract',
])
</script>

<template>
  <DbButtonGroup
    v-for="(button, index) in calculatorButton"
    :key="index"
  >
    <AButton
      custom-class="w-full flex justify-center"
      button-size="xl"
      button-variant="subtle"
      button-color="secondary"
      :button-text="'+'.concat(comma(button).toString())"
      @click="() => $emit('click:add', button)"
    />
    <AButton
      custom-class="w-full flex justify-center"
      button-size="xl"
      button-variant="outline"
      button-color="neutral"
      :button-text="'-'.concat(comma(button).toString())"
      @click="() => $emit('click:subtract', button)"
    />
  </DbButtonGroup>
</template>
