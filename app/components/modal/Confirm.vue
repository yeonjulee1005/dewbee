<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  useClose?: boolean
  preventClose?: boolean
}>(), {
  title: '',
  description: '',
  useClose: true,
  preventClose: false,
})

const emit = defineEmits([
  'click:comfirm',
  'click:cancel',
])

const confirmModalTrigger = defineModel('confirmModalTrigger', {
  type: Boolean,
  default: false,
})

const clickConfirm = () => {
  confirmModalTrigger.value = false
  emit('click:comfirm')
}

const clickCancel = () => {
  confirmModalTrigger.value = false
  emit('click:cancel')
}
</script>

<template>
  <DbModal
    v-model:open="confirmModalTrigger"
    :title="title"
    :description="description"
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
    <template #footer>
      <div class="w-full flex items-center justify-end gap-x-2">
        <AButton
          button-color="primary"
          button-variant="subtle"
          button-size="lg"
          :button-text="$t('button.confirm')"
          @click="clickConfirm"
        />
        <AButton
          button-color="neutral"
          button-size="lg"
          :button-text="$t('button.cancel')"
          @click="clickCancel"
        />
      </div>
    </template>
  </DbModal>
</template>
