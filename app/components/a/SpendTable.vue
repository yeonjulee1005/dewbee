<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

withDefaults(
  defineProps<{
    tableData?: Realtime[] | DailyResult[] | WeeklyResult[]
    tableColumns?: TableColumn<Realtime | DailyResult | WeeklyResult>[]
    pendingTableData?: boolean
    pageSize?: number
    totalCount?: number
  }>(),
  {
    tableData: () => [],
    pendingTableData: false,
    pageSize: 10,
    totalCount: 1,
  },
)

const currentPage = defineModel('currentPage', {
  type: Number,
  default: 0,
})
</script>

<template>
  <div class="px-6">
    <UTable
      :data="tableData"
      :columns="tableColumns"
      :loading="pendingTableData"
      sticky
      :ui="{
        th: 'w-fit text-center',
      }"
    />
    <UPagination
      v-model:page="currentPage"
      class="flex justify-center mx-2 my-2"
      color="neutral"
      variant="subtle"
      :sibling-count="3"
      :items-per-page="pageSize"
      :total="totalCount"
      show-edges
    />
  </div>
</template>
