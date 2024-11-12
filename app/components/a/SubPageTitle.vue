<script setup lang="ts">
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
      :avatar="{ src: '/image/favicon.svg', size: avatarSize }"
    />
  </div>
</template>
