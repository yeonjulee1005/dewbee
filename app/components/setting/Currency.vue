<script setup lang="ts">
const { t } = useLocale()

withDefaults(
  defineProps<{
    currentCurrency?: 'CYC001' | 'CYC002' | 'CYC003'
  }>(),
  {
    currentCurrency: 'CYC001',
  },
)

defineEmits([
  'click:currency',
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
        {{ $t('settings.title.currency') }}
      </p>
    </template>
    <div class="w-full flex justify-center items-center">
      <UButtonGroup
        orientation="horizontal"
        size="xl"
      >
        <UButton
          v-for="currency in ['CYC001', 'CYC002', 'CYC003']"
          :key="currency"
          :label="t(`button.${currency}`)"
          color="primary"
          :variant="currentCurrency === currency ? 'subtle' : 'outline'"
          @click="$emit('click:currency', currency)"
        />
      </UButtonGroup>
    </div>
  </UCard>
</template>
