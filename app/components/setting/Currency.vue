<script setup lang="ts">
withDefaults(
  defineProps<{
    windowWidth?: number
  }>(),
  {
    windowWidth: 0,
  },
)

defineEmits([
  'click:currency-save',
])

const currentCurrency = defineModel('currentCurrency', {
  type: String as PropType<'CYC001' | 'CYC002' | 'CYC003'>,
  default: 'CYC001',
})
</script>

<template>
  <DbCard
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
    <div :class="`w-full flex ${windowWidth > 400 ? 'flex-row items-center' : 'flex-col'} justify-end gap-3`">
      <DbButtonGroup
        :orientation="windowWidth > 400 ? 'horizontal' : 'vertical'"
        size="xl"
      >
        <AButton
          v-for="currency in ['CYC001', 'CYC002', 'CYC003']"
          :key="currency"
          :custom-class="windowWidth > 400 ? '' : 'flex justify-center'"
          :button-text="$t(`text.${currency}`)"
          :button-color="currentCurrency === currency ? 'primary' : 'neutral'"
          :button-variant="currentCurrency === currency ? 'subtle' : 'outline'"
          button-size="xl"
          @click="currentCurrency = currency"
        />
      </DbButtonGroup>
      <AButton
        :custom-class="windowWidth > 400 ? '' : 'flex justify-center'"
        button-size="xl"
        button-color="primary"
        button-variant="soft"
        :button-text="$t('button.save')"
        @click="$emit('click:currency-save')"
      />
    </div>
  </DbCard>
</template>
