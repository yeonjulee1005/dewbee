<script setup lang="ts">
import type { FilterDatabase } from '@/types/supabaseFilter'

const { locale } = useLocale()
const { width } = useWindowSize()

const { localTimezone } = storeToRefs(useFilterDataStore())

withDefaults(
  defineProps<{
    timezoneList?: FilterDatabase['filter']['Tables']['localTimezone']['Row'][]
  }>(),
  {
    timezoneList: () => [],
  },
)

defineEmits([
  'click:save',
])

const computedTimezoneList = computed(() => {
  return localTimezone.value.map((timezone: FilterDatabase['filter']['Tables']['localTimezone']['Row']) => ({
    ...timezone,
    label: timezone.code_name,
    value: timezone.id,
  }))
})

const currentLocalTimezoneId = defineModel('currentLocalTimezoneId', {
  type: String as PropType<string>,
  default: '',
})

const selectedLocalTimezone = ref<LocalTimezone | undefined>(localTimezone.value.find((timezone: FilterDatabase['filter']['Tables']['localTimezone']['Row']) => timezone.id === currentLocalTimezoneId.value))

const updateCurrentLocalTimezone = (timezone: LocalTimezone) => {
  currentLocalTimezoneId.value = timezone.id
}

const calculateUtcOffset = (offset: number) => {
  return offset > 0
    ? `+${offset}`
    : String(offset)
}
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
        {{ $t('settings.title.localTimezone') }}
      </p>
      <p class="text-sm font-light break-keep text-neutral-500 dark:text-neutral-400">
        {{ $t('settings.description.localTimezone') }}
      </p>
    </template>
    <div :class="`w-full flex ${width > 400 ? 'flex-row items-center' : 'flex-col'} justify-end gap-3`">
      <USelectMenu
        v-model="selectedLocalTimezone"
        :items="computedTimezoneList"
        :class="locale === 'ko' ? 'w-full sm:w-64' : 'w-full sm:w-80'"
        size="xl"
        :placeholder="'시간대를 선택해주세요.'"
        :search-input="{
          placeholder: '시간대를 검색해주세요.',
        }"
        :label="selectedLocalTimezone?.code_name"
        @update:model-value="updateCurrentLocalTimezone"
      >
        <template #leading="{ modelValue }">
          <UIcon :name="modelValue?.icon ?? 'i-lucide-globe'" />
        </template>
        <template #default="{ modelValue }">
          {{ $t(`timezone.${modelValue?.code}`) }}
        </template>
        <template #item="{ item }">
          <UIcon :name="item?.icon ?? 'i-lucide-globe'" />
          {{ $t(`timezone.${item?.code}`) }}
          <span class="text-xs font-light text-neutral-400 dark:text-neutral-600">
            {{ $t('text.utc', { offset: calculateUtcOffset(item.utc_offset ?? 0) }) }}
          </span>
        </template>
        <template #empty="{ searchTerm }">
          <p class="text-sm font-light break-keep text-neutral-500 dark:text-neutral-400">
            {{ $t('placeholder.noSearch', { search: searchTerm }) }}
          </p>
        </template>
      </USelectMenu>
      <AButton
        :custom-class="width > 400 ? '' : 'flex justify-center'"
        button-size="xl"
        button-color="primary"
        button-variant="soft"
        :button-text="$t('button.save')"
        @click="$emit('click:save')"
      />
    </div>
  </UCard>
</template>
