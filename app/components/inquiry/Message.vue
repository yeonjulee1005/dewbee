<script setup lang="ts">
const { userData } = storeToRefs(useUserDataStore())

withDefaults(
  defineProps<{
    writeUserId?: string
    chatMessage?: string
    createdAt?: string
  }>(),
  {
    writeUserId: '',
    chatMessage: '',
    createdAt: '',
  },
)

const formatMessage = (message: string) => {
  return message.replace(/\n/g, '<br>')
}
</script>

<template>
  <div
    class="flex flex-col gap-y-3 mx-0.5"
    :class="{ 'items-start': writeUserId !== userData?.id, 'items-end': writeUserId === userData?.id }"
  >
    <UCard
      :ui="{
        root: `w-auto max-w-[300px] min-w-[140px] ${writeUserId !== userData?.id ? 'ring-neutral-200 dark:ring-neutral-800' : 'ring-amber-600 dark:ring-amber-400'} ${writeUserId !== userData?.id ? 'bg-white dark:bg-neutral-900' : 'bg-amber-400/50 dark:bg-amber-600/50'}`,
        body: 'p-4',
      }"
    >
      <div
        v-dompurify-html="formatMessage(chatMessage)"
        class="text-sm break-all"
        :class="{ 'text-left': writeUserId !== userData?.id, 'text-right': writeUserId === userData?.id }"
      />
    </UCard>
    <ANuxtTime
      class="text-xs text-neutral-400 dark:text-neutral-500"
      :date-time="createdAt"
    />
  </div>
</template>
