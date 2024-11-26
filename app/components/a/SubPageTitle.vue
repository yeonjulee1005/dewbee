<script setup lang="ts">
const { url } = useImageStorage()

withDefaults(
  defineProps<{
    title?: string
    titleClass?: string
    avatarSize?: 'sm' | 'md' | 'lg'
  }>(),
  {
    title: '',
    titleClass: 'text-3xl font-bold',
    avatarSize: 'lg',
  },
)
</script>

<template>
  <div class="w-full flex flex-col gap-y-2.5 px-6">
    <p :class="titleClass">
      {{ title }}
    </p>
    <USeparator
      size="md"
      :avatar="{
        src: url(true, '/assets/dewbee_logo.webp'),
        size: avatarSize,
        alt: 'Avatar',
      }"
    />
  </div>
</template>
