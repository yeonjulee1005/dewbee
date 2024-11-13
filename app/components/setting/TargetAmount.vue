<script setup lang="ts">
const { t } = useLocale()

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
  <UCard
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
    <div class="w-full flex justify-end items-center">
      <UButtonGroup>
        <UInput
          v-model="targetAmount"
          variant="subtle"
          highlight
          size="xl"
          type="number"
          :step="1000"
          :min="0"
          :placeholder="$t('placeholder.targetAmount')"
          :ui="{
            base: 'text-right',
            trailing: 'pl-2 pr-2 end-2',
          }"
        />
        <AButton
          v-if="targetAmount !== 0"
          use-leading
          icon-lead-name="i-lucide-x"
          icon-lead-class="w-4 h-4"
          button-size="xl"
          button-color="neutral"
          button-variant="outline"
          @click="targetAmount = 0"
        />
        <AButton
          button-size="xl"
          button-color="neutral"
          button-variant="subtle"
          :button-text="$t('button.save')"
          @click="$emit('click:save')"
        />
      </UButtonGroup>
    </div>
  </UCard>
</template>
