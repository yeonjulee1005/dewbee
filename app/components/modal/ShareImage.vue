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

const shareImageUrl = defineModel('shareImageUrl', {
  type: String,
  default: '',
})
</script>

<template>
  <UModal
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
      <div class="w-full h-full flex justify-center items-center">
        <NuxtImg
          :src="shareImageUrl"
          class="w-fit h-fit sm:w-2/3 sm:h-auto"
          alt="share image"
        />
      </div>
    </template>
  </UModal>
</template>
