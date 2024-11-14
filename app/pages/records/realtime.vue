<script setup lang="ts">
import { formatInTimeZone } from 'date-fns-tz'
import { ko, enUS } from 'date-fns/locale'
import type { TableColumn } from '@nuxt/ui'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const { t, locale } = useLocale()
const { comma } = useUi()

const { userData } = storeToRefs(useUserDataStore())

const { fetchPaginationData } = useFetchComposable()

useHead({
  title: t('pageTitle.realtimeSpend'),
})

definePageMeta({
  middleware: 'auth',
})

const page = ref(1)
const pageSize = ref(10)
const realtimeSpendTotalCount = ref(1)

const pageCalc = (page: number, pageCount: number, firstRange: boolean): number => {
  return firstRange
    ? (page - 1) * pageCount
    : (page * pageCount) - 1
}

const { data: realtimeSpendList, pending: pendingRealtimeSpendList } = useAsyncData(async () => {
  const { data: response, count } = await fetchPaginationData('viewSpendList', '*', pageCalc(page.value, pageSize.value, true), pageCalc(page.value, pageSize.value, false), 'update_user_id', userData.value?.id ?? '')

  count
    ? realtimeSpendTotalCount.value = count
    : realtimeSpendTotalCount.value = 1

  return response
    ? response
    : []
}, {
  lazy: true,
  watch: [page, pageSize],
})

const columns: TableColumn<Realtime | DailyResult | WeeklyResult>[] = [
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
          comma((row.original as Realtime).amount ?? 0),
        ]),
        h('div', { class: 'ml-1 text-xs font-light' }, [
          t(`currency.${row?.original.currency?.code ?? ''}`),
        ]),
      ])
    },
  },
  {
    accessorKey: 'spendCategory.code_name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: t('label.category'),
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
      return h('div', { class: 'min-w-[100px] flex items-center justify-end gap-2 font-light text-neutral-800 dark:text-neutral-200' }, [
        h(UBadge, {
          icon: (row.original as Realtime).spendCategory.icon_name ?? '',
          variant: 'subtle',
          class: colorTranslate((row.original as Realtime).spendCategory.code),
          label: (row.original as Realtime).spendCategory.code_name,
        }),
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
      return h('div', { class: 'flex items-center justify-end font-light text-neutral-800 dark:text-neutral-200' }, [
        formatInTimeZone(row.original?.created_at ?? '', 'Asia/Seoul', 'yyyy-MM-dd a h:mm', { locale: locale.value === 'ko' ? ko : enUS }),
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
    header: t('label.spendId'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center justify-end font-light text-neutral-800 dark:text-neutral-200' }, [
        '#' + (row.original?.id?.split('-')[0] ?? ''),
      ])
    },
  },
]

const colorTranslate = (code: string) => {
  switch (code) {
    case 'SCC001':
      return 'text-orange-700 dark:text-orange-300'
    case 'SCC002':
      return 'text-yellow-700 dark:text-yellow-300'
    case 'SCC003':
      return 'text-lime-700 dark:text-lime-300'
    case 'SCC004':
      return 'text-emerald-700 dark:text-emerald-300'
    case 'SCC005':
      return 'text-cyan-700 dark:text-cyan-300'
    case 'SCC006':
      return 'text-sky-700 dark:text-sky-300'
    case 'SCC007':
      return 'text-indigo-700 dark:text-indigo-300'
    case 'SCC008':
      return 'text-fuchsia-700 dark:text-fuchsia-300'
    case 'SCC009':
      return 'text-rose-700 dark:text-rose-300'
    case 'SCC010':
      return 'text-purple-700 dark:text-purple-300'
    case 'SCC011':
      return 'text-blue-700 dark:text-blue-300'
    default:
      return 'text-neutral-700 dark:text-neutral-300'
  }
}
</script>

<template>
  <div class="w-full h-[calc(100dvh-80px)] flex flex-col justify-center gap-y-8 py-4">
    <ASubPageTitle
      :title="$t('pageTitle.realtimeSpend')"
      title-class="text-2xl font-semibold"
      avatar-size="md"
    />
    <ASpendTable
      v-model:current-page="page"
      :table-data="realtimeSpendList"
      :table-columns="columns"
      is-realtime
      :pending-table-data="pendingRealtimeSpendList"
      :page-size="pageSize"
      :total-count="realtimeSpendTotalCount"
    />
  </div>
</template>
