<script setup lang="ts">
import { subDays } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { ko, enUS } from 'date-fns/locale'
import type { TableColumn } from '@nuxt/ui'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const { t, locale } = useCustomLocale()
const { comma } = useUi()

const { mobileOperationSystem } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.weeklySpend'),
  meta: [{ name: 'description', content: t('pageDescription.weeklySpend') }],
})

definePageMeta({
  middleware: 'auth',
})

const page = ref(1)
const pageSize = ref(7)

// const isProPlan = userData.value.plan.code === 'PNC002'
const isProPlan = true

const pageCalc = (page: number, pageCount: number, firstRange: boolean): number => {
  return firstRange
    ? (page - 1) * pageCount
    : (page * pageCount) - 1
}

const { data: weeklyResultData, pending: pendingWeeklyResultData } = useLazyAsyncData('weeklyResultData', async () => {
  const { data }: SerializeObject = await useFetch('/api/pagination', {
    query: {
      tableName: 'viewWeeklyResultList',
      startPage: pageCalc(page.value, pageSize.value, true),
      endPage: isProPlan ? pageCalc(page.value, pageSize.value, false) : 3,
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

const columns: TableColumn<WeeklyResult | DailyResult | Realtime>[] = [
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
      return h('div', { class: 'flex items-center justify-end font-light text-neutral-800 dark:text-neutral-200' }, [
        h(UBadge, {
          variant: 'subtle',
          color: (row.original as WeeklyResult).is_success ? 'secondary' : 'error',
          class: successColorTranslate((row.original as WeeklyResult).is_success ?? false),
          size: 'lg',
          label: (row.original as WeeklyResult).is_success ? t('text.success') : t('text.fail'),
        }),
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
      const percentage = ((row.original as WeeklyResult).summary_amount ?? 0) / ((row.original as WeeklyResult).weekly_target_amount ?? 0) * 100

      return h('div', { class: `min-w-[100px] flex items-center justify-end ${spendColorTranslate(percentage)}` }, [
        h('span', { class: 'font-semibold' }, [
          comma((row.original as WeeklyResult).summary_amount ?? 0),
        ]),
        h('span', { class: 'ml-1 text-xs font-light' }, [
          t(`currency.${row?.original.currency?.code ?? ''}`),
        ]),
      ])
    },
  },
  {
    accessorKey: 'weekly_target_amount',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: t('label.weeklyTarget'),
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
          comma((row.original as WeeklyResult).weekly_target_amount ?? 0),
        ]),
        h('span', { class: 'ml-1 text-xs font-light' }, [
          t(`currency.${row?.original.currency?.code ?? ''}`),
        ]),
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
        label: t('label.targetBalance'),
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
      const gap = ((row?.original as WeeklyResult).weekly_target_amount ?? 0) - ((row?.original as WeeklyResult).summary_amount ?? 0)
      const percentage = ((row.original as WeeklyResult).summary_amount ?? 0) / ((row.original as WeeklyResult).weekly_target_amount ?? 0) * 100

      return h('div', { class: `min-w-[100px] flex items-center justify-end ${spendColorTranslate(percentage)}` }, [
        h('span', { class: 'font-semibold' }, [
          comma(gap),
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
        label: t('label.spendRangeDate'),
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
      const summaryStartDate = subDays(new Date(row.original?.created_at ?? ''), 7)
      const summaryEndDate = subDays(new Date(row.original?.created_at ?? ''), 1)

      const summaryDate = formatInTimeZone(summaryStartDate, 'Asia/Seoul', 'yy.MM.dd', { locale: locale.value === 'ko' ? ko : enUS })
        .concat(' ~ ', formatInTimeZone(summaryEndDate, 'Asia/Seoul', 'yy.MM.dd', { locale: locale.value === 'ko' ? ko : enUS }))

      return h('div', { class: 'flex items-center justify-end font-light text-neutral-800 dark:text-neutral-200' }, [
        summaryDate,
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

const spendColorTranslate = (percentage: number) => {
  switch (true) {
    case percentage <= 25:
      return 'text-sky-700 dark:text-sky-300'
    case percentage <= 50:
      return 'text-lime-700 dark:text-lime-300'
    case percentage <= 75:
      return 'text-orange-700 dark:text-orange-300'
    default:
      return 'text-rose-700 dark:text-rose-300'
  }
}

const successColorTranslate = (isSuccess: boolean) => {
  switch (isSuccess) {
    case true:
      return 'text-sky-700 dark:text-sky-300'
    case false:
      return 'text-rose-700 dark:text-rose-300'
  }
}
</script>

<template>
  <div
    class="relative w-full h-fit flex flex-col justify-center gap-y-8 pt-4 pb-6"
    :class="{ 'mt-10': mobileOperationSystem === 'android' }"
  >
    <ASubPageTitle
      :title="$t('pageTitle.weeklySpend')"
      title-class="text-2xl font-semibold"
      avatar-size="md"
    />
    <p
      v-if="!isProPlan"
      class="text-xl font-light text-amber-700 dark:text-amber-300 px-6"
    >
      {{ $t('records.needProPlan') }}
    </p>
    <ASpendTable
      v-model:current-page="page"
      :table-data="weeklyResultData?.list"
      :table-columns="columns"
      :pending-table-data="pendingWeeklyResultData"
      :page-size="pageSize"
      :total-count="weeklyResultData?.count"
      :use-pagination="isProPlan"
    />
  </div>
</template>
