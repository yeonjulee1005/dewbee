<script setup lang="ts">
const { tm } = useLocale()

const _list: PlanList[] = tm('plan.list')
</script>

<template>
  <div class="w-full flex flex-col md:flex-row gap-4">
    <UCard
      v-for="(list, index) in _list"
      :key="index"
      :ui="{
        root: 'w-full md:w-1/2 ring-4 ring-amber-500',
        body: 'p-4',
      }"
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
          <span class="text-3xl font-black">
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
              class="w-5 h-5 text-amber-500"
            />
            <span class="text-base text-neutral-400">
              {{ $rt(feature) }}
            </span>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
