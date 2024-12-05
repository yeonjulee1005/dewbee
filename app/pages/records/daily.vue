<script setup lang="ts">
import { subDays } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { ko, enUS } from 'date-fns/locale'
import type { TableColumn } from '@nuxt/ui'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')

const { t, locale } = useCustomLocale()
const { comma } = useUi()

const { mobileOperationSystem } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.dailySpend'),
  meta: [{ name: 'description', content: t('pageDescription.dailySpend') }],
})

definePageMeta({
  middleware: 'auth',
})

const page = ref(1)
const pageSize = ref(7)

const pageCalc = (page: number, pageCount: number, firstRange: boolean): number => {
  return firstRange
    ? (page - 1) * pageCount
    : (page * pageCount) - 1
}

const { data: dailyResultData, pending: pendingDailyResultData } = useLazyAsyncData('dailyResultData', async () => {
  const { data }: SerializeObject = await useFetch('/api/pagination', {
    query: {
      tableName: 'viewDailyResultList',
      startPage: pageCalc(page.value, pageSize.value, true),
      endPage: pageCalc(page.value, pageSize.value, false),
    },
    headers: useRequestHeaders(['cookie']),
  })

  return data.value && data.value.data && data.value.count
    ? { list: data.value.data, count: data.value.count }
    : { list: [], count: 0 }
}, {
  dedupe: 'defer',
  deep: true,
  watch: [page, pageSize],
})

const columns: TableColumn<DailyResult | WeeklyResult | Realtime>[] = [
  {
    accessorKey: 'summary_amount',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: t('label.dailySummary'),
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
        h('span', { class: 'font-semibold' }, [
          comma((row.original as DailyResult).summary_amount ?? 0),
        ]),
        h('span', { class: 'ml-1 text-xs font-light' }, [
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
      const paidDate = subDays(new Date(row.original?.created_at ?? ''), 1)

      return h('div', { class: 'flex items-center justify-end font-light text-neutral-800 dark:text-neutral-200' }, [
        formatInTimeZone(paidDate, 'Asia/Seoul', 'yyyy-MM-dd', { locale: locale.value === 'ko' ? ko : enUS }),
      ])
    },
  },
  {
    accessorKey: 'profiles.name',
    header: t('label.nickname'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center justify-end gap-3 font-light text-neutral-800 dark:text-neutral-200' }, [
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
    header: t('label.summaryId'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center justify-end font-light text-neutral-800 dark:text-neutral-200' }, [
        '#' + (row.original?.id?.split('-')[0] ?? ''),
      ])
    },
  },
]
</script>

<template>
  <div
    class="relative w-full h-fit flex flex-col justify-center gap-y-8 pt-4 pb-6"
    :class="{ 'mt-10': mobileOperationSystem === 'android' }"
  >
    <ASubPageTitle
      :title="$t('pageTitle.dailySpend')"
      title-class="text-2xl font-semibold"
      avatar-size="md"
    />
    <ASpendTable
      v-model:current-page="page"
      :table-data="dailyResultData?.list"
      :table-columns="columns"
      :pending-table-data="pendingDailyResultData"
      :page-size="pageSize"
      :total-count="dailyResultData?.count"
    />
  </div>
</template>
