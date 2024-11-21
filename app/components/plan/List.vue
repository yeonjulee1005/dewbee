<script setup lang="ts">
const { tm } = useCustomLocale()

const { windowSize } = storeToRefs(useWindowStore())

const props = withDefaults(
  defineProps<{
    clickable?: boolean
  }>(),
  {
    clickable: false,
  },
)

const emit = defineEmits([
  'click:plan',
])

const _list: PlanList[] = tm('plan.list')

const moveToPlanPage = (index: number) => {
  if (!props.clickable) {
    return
  }

  emit('click:plan', index === 0 ? 'free' : 'pro')
}
</script>

<template>
  <div class="w-full flex flex-col md:flex-row gap-6">
    <UCard
      v-for="(list, index) in _list"
      :key="index"
      :ui="{
        root: `w-full md:w-1/2 ${index === 0 ? 'ring' : 'ring-4 ring-amber-500'} ${index === 0 ? 'hover:ring-2' : 'hover:ring-amber-600 hover:dark:ring-amber-400'} ${clickable ? 'cursor-pointer' : ''} transition-all duration-200 ease-in-out`,
        body: 'p-4',
      }"
      @click="moveToPlanPage(index)"
    >
      <div class="flex flex-col gap-y-4">
        <div class="flex flex-col gap-y-0.5">
          <p class="text-left text-xl font-bold">
            {{ $rt(list.title) }}
          </p>
          <p class="text-sm font-light text-neutral-400">
            {{ $rt(list.description) }}
          </p>
        </div>
        <div class="flex items-center gap-x-2">
          <span :class="`${windowSize > 340 ? 'text-3xl' : 'text-2xl'} font-black`">
            {{ $rt(list.fee.amount) }}
          </span>
          <div class="flex flex-col">
            <span class="text-xs font-light">
              {{ $rt(list.fee.period) }}
            </span>
            <span class="text-xs font-light text-neutral-400">
              {{ $rt(list.fee.vat) }}
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-y-2">
          <div
            v-for="(feature, featureIndex) in list.features"
            :key="featureIndex"
            class="flex items-center gap-x-2"
          >
            <Icon
              name="i-lucide-circle-check-big"
              class="min-w-5 min-h-5 text-amber-500"
            />
            <span :class="`${windowSize > 340 ? 'text-base' : 'text-sm'} text-neutral-400`">
              {{ $rt(feature) }}
            </span>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
