<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const { windowSize } = storeToRefs(useWindowStore())

withDefaults(
  defineProps<{
    tableData?: Realtime[] | DailyResult[] | WeeklyResult[]
    tableColumns?: TableColumn<Realtime | DailyResult | WeeklyResult>[]
    pendingTableData?: boolean
    isRealtime?: boolean
    pageSize?: number
    totalCount?: number
    usePagination?: boolean
  }>(),
  {
    tableData: () => [],
    pendingTableData: false,
    isRealtime: false,
    pageSize: 7,
    totalCount: 1,
    usePagination: true,
  },
)

const currentPage = defineModel('currentPage', {
  type: Number,
  default: 0,
})
</script>

<template>
  <div class="h-fit flex flex-col items-center px-6">
    <UTable
      class="w-full"
      :data="tableData"
      :columns="tableColumns"
      :loading="pendingTableData"
      sticky
      :ui="{
        th: 'w-fit text-center',
      }"
    >
      <template #empty>
        <p
          v-if="!pendingTableData"
          class="text-xl font-light text-neutral-800 dark:text-neutral-200 py-10"
        >
          {{ isRealtime ? $t('placeholder.noSpendRecords') : $t('placeholder.noResultRecords') }}
        </p>
        <div
          v-else
          class="flex justify-center items-center min-h-[300px]"
        >
          <Icon
            name="i-svg-spinners-pulse-multiple"
            class="w-28 h-28"
          />
        </div>
      </template>
    </UTable>
    <ClientOnly>
      <template #default>
        <UPagination
          v-if="usePagination"
          v-model:page="currentPage"
          class="w-fit flex justify-center mx-2 my-2"
          color="neutral"
          variant="subtle"
          :sibling-count="1"
          :size="windowSize < 380 ? 'xs' : 'lg'"
          showo-edge
          :items-per-page="pageSize"
          :total="totalCount"
          show-edges
          @update:page="(changedPage: number) => currentPage = changedPage"
        />
      </template>
      <template #fallback>
        <div class="w-[204px] h-[24px] sm:w-[276px] sm:h-[36px] rounded-lg ring ring-neutral-200 dark:ring-neutral-700 animate-pulse m-2" />
      </template>
    </ClientOnly>
  </div>
</template>
