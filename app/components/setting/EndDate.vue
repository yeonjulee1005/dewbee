<script setup lang="ts">
const { width } = useWindowSize()

withDefaults(
  defineProps<{
    currentEndDate?: 'EDC001' | 'EDC002' | 'EDC003' | 'EDC004' | 'EDC005' | 'EDC006' | 'EDC007'
  }>(),
  {
    currentEndDate: 'EDC001',
  },
)

defineEmits([
  'click:end-date',
])
</script>

<template>
  <UCard
    :ui="{
      root: 'w-[calc(100%-3rem)] ring ring-neutral-400 dark:ring-neutral-600',
      body: 'p-4',
    }"
  >
    <template #header>
      <p class="text-xl font-bold break-keep mb-2">
        {{ $t('settings.title.endDate') }}
      </p>
      <p class="text-sm font-light break-keep text-neutral-500 dark:text-neutral-400">
        {{ $t('settings.description.endDate') }}
      </p>
    </template>
    <div class="w-full flex justify-end items-center">
      <UButtonGroup
        :orientation="width > 340 ? 'horizontal' : 'vertical'"
        size="xl"
      >
        <AButton
          v-for="endDate in ['EDC001', 'EDC002', 'EDC003', 'EDC004', 'EDC005', 'EDC006', 'EDC007']"
          :key="endDate"
          :button-text="$t(`text.${endDate}`)"
          :button-color="currentEndDate === endDate ? 'primary' : 'neutral'"
          :button-variant="currentEndDate === endDate ? 'subtle' : 'outline'"
          button-size="xl"
          @click="$emit('click:end-date', endDate)"
        />
      </UButtonGroup>
    </div>
  </UCard>
</template>
