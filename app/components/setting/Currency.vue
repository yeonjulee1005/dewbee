<script setup lang="ts">
const { width } = useWindowSize()

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
      root: 'w-[calc(100%-3rem)] ring ring-neutral-400 dark:ring-neutral-600',
      body: 'p-4',
    }"
  >
    <template #header>
      <p class="text-xl font-bold break-keep mb-2">
        {{ $t('settings.title.currency') }}
      </p>
      <p class="text-sm font-light break-keep text-neutral-500 dark:text-neutral-400">
        {{ $t('settings.description.currency') }}
      </p>
    </template>
    <div class="w-full flex justify-end items-center">
      <UButtonGroup
        :orientation="width > 340 ? 'horizontal' : 'vertical'"
        size="xl"
      >
        <AButton
          v-for="currency in ['CYC001', 'CYC002', 'CYC003']"
          :key="currency"
          :button-text="$t(`text.${currency}`)"
          :button-color="currentCurrency === currency ? 'primary' : 'neutral'"
          :button-variant="currentCurrency === currency ? 'subtle' : 'outline'"
          button-size="xl"
          @click="$emit('click:currency', currency)"
        />
      </UButtonGroup>
    </div>
  </UCard>
</template>
