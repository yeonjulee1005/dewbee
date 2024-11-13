<script setup lang="ts">
import { formatInTimeZone } from 'date-fns-tz'
import { ko, enUS } from 'date-fns/locale'
import type { TableColumn } from '@nuxt/ui'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')

const { t, locale } = useLocale()
const { comma } = useUi()

const { userData } = storeToRefs(useUserDataStore())

const { fetchPaginationData } = useFetchComposable()

useHead({
  title: t('pageTitle.weeklySpend'),
})

definePageMeta({
  middleware: 'auth',
})

const page = ref(1)
const pageSize = ref(10)
const weeklyResultTotalCount = ref(1)

const pageCalc = (page: number, pageCount: number, firstRange: boolean): number => {
  return firstRange
    ? (page - 1) * pageCount
    : (page * pageCount) - 1
}

const { data: weeklyResultList, pending: pendingWeeklyResultList } = useAsyncData(async () => {
  const { data: response, count } = await fetchPaginationData('viewWeeklyResultList', '*', pageCalc(page.value, pageSize.value, true), pageCalc(page.value, pageSize.value, false), 'update_user_id', userData.value?.id ?? '')

  count
    ? weeklyResultTotalCount.value = count
    : weeklyResultTotalCount.value = 1

  return response
    ? response
    : []
}, {
  lazy: true,
  watch: [page, pageSize],
})

const columns: TableColumn<WeeklyResult>[] = [
  {
    accessorKey: 'is_success',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: t('label.isSuccess'),
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
      return h('div', { class: 'font-light text-neutral-800 dark:text-neutral-200' }, [
        row.original.is_success ? 'O' : 'X',
      ])
    },
  },
  {
    accessorKey: 'summary_amount',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: t('label.weeklySummary'),
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
          comma(row?.original.summary_amount ?? 0),
        ]),
        h('div', { class: 'ml-1 text-xs font-light' }, [
          t(`currency.${row?.original.currency?.code ?? ''}`),
        ]),
      ])
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: t('label.summaryDate'),
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
      return h('div', { class: 'flex items-center justify-end font-light text-neutral-800 dark:text-neutral-200' }, [
        formatInTimeZone(row.original?.created_at ?? '', 'Asia/Seoul', 'yyyy-MM-dd', { locale: locale.value === 'ko' ? ko : enUS }),
      ])
    },
  },
  {
    accessorKey: 'profiles.name',
    header: t('label.nickname'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-end gap-3 font-light text-neutral-800 dark:text-neutral-200' }, [
        h(UAvatar, {
          src: row.original.profiles.avatar_url,
          size: 'sm',
        }),
        h('div', undefined, [
          row.original.profiles.nickname,
        ]),
      ])
    },
  },
  {
    accessorKey: 'id',
    header: t('label.id'),
    cell: ({ row }) => {
      return h('div', { class: 'font-light text-neutral-800 dark:text-neutral-200' }, [
        '#' + (row.original?.id?.split('-')[0] ?? ''),
      ])
    },
  },
]
</script>

<template>
  <div class="w-full h-[calc(100dvh-80px)] flex flex-col justify-center gap-y-8 py-4">
    <ASubPageTitle
      :title="$t('pageTitle.weeklySpend')"
      title-class="text-2xl font-semibold"
      avatar-size="md"
    />
    <ASpendTable
      v-model:current-page="page"
      :table-data="weeklyResultList"
      :table-columns="columns"
      :pending-table-data="pendingWeeklyResultList"
      :page-size="pageSize"
      :total-count="weeklyResultTotalCount"
    />
  </div>
</template>
