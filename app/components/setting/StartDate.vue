<script setup lang="ts">
const { t } = useLocale()

withDefaults(
  defineProps<{
    currentStartDate?: 'SDC001' | 'SDC002' | 'SDC003' | 'SDC004' | 'SDC005' | 'SDC006' | 'SDC007'
  }>(),
  {
    currentStartDate: 'SDC001',
  },
)

defineEmits([
  'click:start-date',
])
</script>

<template>
  <UCard
    :ui="{
      root: 'w-[calc(100%-3rem)] ring-2 ring-neutral-400 dark:ring-neutral-600',
      body: 'p-4',
    }"
  >
    <template #header>
      <p class="text-xl font-bold break-keep">
        {{ $t('settings.title.startDate') }}
      </p>
    </template>
    <div class="w-full flex justify-center items-center">
      <UButtonGroup
        orientation="horizontal"
        size="xl"
      >
        <UButton
          v-for="startDate in ['SDC001', 'SDC002', 'SDC003', 'SDC004', 'SDC005', 'SDC006', 'SDC007']"
          :key="startDate"
          :label="t(`button.${startDate}`)"
          color="primary"
          :variant="currentStartDate === startDate ? 'subtle' : 'outline'"
          @click="$emit('click:start-date', startDate)"
        />
      </UButtonGroup>
    </div>
  </UCard>
</template>
