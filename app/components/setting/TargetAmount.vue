<script setup lang="ts">
const { t } = useCustomLocale()

const props = withDefaults(
  defineProps<{
    currentCurrency?: 'CYC001' | 'CYC002' | 'CYC003'
  }>(),
  {
    currentCurrency: 'CYC001',
  },
)

defineEmits([
  'click:save',
])

const targetAmount = defineModel('targetAmount', {
  type: Number,
  default: 0,
})

const computedCurrencyTitle = computed(() => {
  return t(`text.${props.currentCurrency}`)
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
        {{ $t('settings.title.targetAmount', { currency: computedCurrencyTitle }) }}
      </p>
      <p class="text-sm font-light break-keep text-neutral-500 dark:text-neutral-400">
        {{ $t('settings.description.targetAmount') }}
      </p>
    </template>
    <div class="w-full flex sm:flex-row flex-col justify-end items-center gap-3">
      <DbInputNumber
        v-model="targetAmount"
        class="w-full"
        size="xl"
        :min="0"
        :step="1000"
        :placeholder="$t('placeholder.targetAmount')"
      />
      <div class="w-full sm:w-auto flex gap-3">
        <AButton
          v-if="targetAmount !== 0"
          button-block
          button-size="xl"
          button-color="neutral"
          button-variant="outline"
          :button-text="$t('button.clear')"
          @click="targetAmount = 0"
        />
        <AButton
          button-block
          button-size="xl"
          button-color="primary"
          button-variant="soft"
          :button-text="$t('button.save')"
          @click="$emit('click:save')"
        />
      </div>
    </div>
  </DbCard>
</template>
