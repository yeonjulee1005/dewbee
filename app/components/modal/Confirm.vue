<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: '',
  description: '',
})

defineEmits([
  'click:comfirm',
])

const confirmModalTrigger = defineModel('confirmModalTrigger', {
  type: Boolean,
  default: false,
})
</script>

<template>
  <UModal
    v-model:open="confirmModalTrigger"
    :title="title"
    :description="description"
    :close="{
      color: 'primary',
      variant: 'outline',
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
          @click="$emit('click:comfirm')"
        />
        <AButton
          button-color="neutral"
          button-size="lg"
          :button-text="$t('button.cancel')"
          @click="confirmModalTrigger = false"
        />
      </div>
    </template>
  </UModal>
</template>
