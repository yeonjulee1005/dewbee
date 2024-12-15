<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  useClose?: boolean
  preventClose?: boolean
  fullscreen?: boolean
}>(), {
  title: '',
  description: '',
  useClose: true,
  preventClose: false,
  fullscreen: true,
})

const shareImageModalTrigger = defineModel('shareImageModalTrigger', {
  type: Boolean,
  default: false,
})
</script>

<template>
  <DbModal
    v-model:open="shareImageModalTrigger"
    :title="title"
    :description="description"
    :fullscreen="fullscreen"
    :prevent-close="preventClose"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: useClose ? '' : 'hidden',
    }"
    :ui="{
      title: 'text-lg',
      description: 'text-md font-light',
    }"
  >
    <template #body>
      <slot />
    </template>
  </DbModal>
</template>
