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
    pageSize: 10,
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
        <p class="text-xl font-light text-neutral-800 dark:text-neutral-200 py-10">
          {{ isRealtime ? $t('placeholder.noSpendRecords') : $t('placeholder.noResultRecords') }}
        </p>
      </template>
    </UTable>
    <UPagination
      v-if="usePagination"
      v-model:page="currentPage"
      class="w-fit flex justify-center mx-2 my-2"
      color="neutral"
      variant="subtle"
      :sibling-count="1"
      :size="windowSize < 340 ? 'xs' : 'lg'"
      showo-edge
      :items-per-page="pageSize"
      :total="totalCount"
      show-edges
      @update:page="(changedPage: number) => currentPage = changedPage"
    />
  </div>
</template>
