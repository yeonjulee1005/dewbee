<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  useClose?: boolean
  preventClose?: boolean
  fullScreen?: boolean
}>(), {
  title: '',
  description: '',
  useClose: true,
  preventClose: false,
  fullScreen: true,
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
  <DbModal
    v-model:open="shareImageModalTrigger"
    :title="title"
    :description="description"
    :fullscreen="fullScreen"
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
      <div class="w-full h-full flex justify-center items-center px-6">
        <NuxtImg
          :src="shareImageUrl"
          class="w-full h-auto"
          loading="lazy"
          alt="board-image"
          draggable="false"
          @contextmenu.prevent
        />
      </div>
    </template>
  </DbModal>
</template>
