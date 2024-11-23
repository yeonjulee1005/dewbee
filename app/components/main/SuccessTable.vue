<script setup lang="ts">
import { formatInTimeZone } from 'date-fns-tz'
import { ko, enUS } from 'date-fns/locale'
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const { t, locale } = useCustomLocale()
const { comma } = useUi()

withDefaults(
  defineProps<{
    tableData?: WeeklyResult[]
    pendingTableData?: boolean
  }>(),
  {
    tableData: () => [],
    pendingTableData: false,
  },
)

const columns: TableColumn<WeeklyResult>[] = [
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: t('label.createdAt'),
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center justify-center font-light text-neutral-800 dark:text-neutral-200' }, [
        formatInTimeZone(row.original?.created_at ?? '', 'Asia/Seoul', 'yyyy-MM-dd a h:mm', { locale: locale.value === 'ko' ? ko : enUS }),
      ])
    },
  },
  {
    accessorKey: 'is_success',
    header: t('label.isSuccess'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center justify-center font-light text-neutral-800 dark:text-neutral-200' }, [
        h(UBadge, {
          variant: 'subtle',
          class: row.original.is_success ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300',
          label: row.original.is_success ? t('text.success') : t('text.fail'),
        }),
      ])
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: t('label.amount'),
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
    cell: ({ row }) => {
      return h('div', { class: 'min-w-[100px] flex items-center justify-end text-neutral-800 dark:text-neutral-200' }, [
        h('div', { class: 'font-semibold' }, [
          comma((row.original.weekly_target_amount ?? 0) - (row.original.summary_amount ?? 0)),
        ]),
        h('div', { class: 'ml-1 text-xs font-light' }, [
          t(`currency.${row?.original.currency?.code ?? ''}`),
        ]),
      ])
    },
  },
]
</script>

<template>
  <UCard
    :ui="{
      root: 'w-full ring-2',
      header: 'w-full',
      body: 'p-0 sm:p-0 sm:py-2 py-2',
    }"
  >
    <UTable
      class="w-full"
      :data="tableData"
      :columns="columns"
      :loading="pendingTableData"
      sticky
      :ui="{
        th: 'w-fit text-center pt-1 pb-3',
        td: 'pt-4 pb-2',
      }"
    >
      <template #empty>
        <p class="text-xl font-light text-neutral-800 dark:text-neutral-200 py-10">
          {{ $t('placeholder.noResultRecords') }}
        </p>
      </template>
    </UTable>
  </UCard>
</template>
