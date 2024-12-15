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
  'click:end-date',
  'click:save',
])

const currentEndDate = defineModel('currentEndDate', {
  type: String as PropType<'EDC001' | 'EDC002' | 'EDC003' | 'EDC004' | 'EDC005' | 'EDC006' | 'EDC007'>,
  default: 'EDC001',
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
        {{ $t('settings.title.endDate') }}
      </p>
      <p class="text-sm font-light break-keep text-neutral-500 dark:text-neutral-400">
        {{ $t('settings.description.endDate') }}
      </p>
    </template>
    <div :class="`w-full flex ${windowWidth > 400 ? 'flex-row items-center' : 'flex-col'} justify-end gap-3`">
      <DbButtonGroup
        :orientation="windowWidth > 400 ? 'horizontal' : 'vertical'"
        size="xl"
      >
        <AButton
          v-for="endDate in ['EDC001', 'EDC002', 'EDC003', 'EDC004', 'EDC005', 'EDC006', 'EDC007']"
          :key="endDate"
          :custom-class="windowWidth > 400 ? '' : 'flex justify-center'"
          :button-text="$t(`text.${endDate}`)"
          :button-color="currentEndDate === endDate ? 'primary' : 'neutral'"
          :button-variant="currentEndDate === endDate ? 'subtle' : 'outline'"
          button-size="xl"
          @click="currentEndDate = endDate"
        />
      </DbButtonGroup>
      <AButton
        :custom-class="windowWidth > 400 ? '' : 'flex justify-center'"
        button-size="xl"
        button-color="primary"
        button-variant="soft"
        :button-text="$t('button.save')"
        @click="$emit('click:save')"
      />
    </div>
  </DbCard>
</template>
