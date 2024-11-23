import type { FilterDatabase } from '@/types/supabaseFilter'

export const useLoadFilterData = () => {
  const {
    currencyCodeList,
    planCodeList,
    spendCategoryCodeList,
    endDateCodeList,
    localTimezone,
  } = storeToRefs(useFilterDataStore())

  const { execute: executeCurrencyCodeList } = useAsyncData('currencyCodeList', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'currency',
      },
      headers: useRequestHeaders(['cookie']),
    })

    currencyCodeList.value = data as unknown as FilterDatabase['filter']['Tables']['currency']['Row'][]
  }, {
    immediate: true,
  })

  const { execute: executePlanCodeList } = useAsyncData('planCodeList', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'plan',
      },
      headers: useRequestHeaders(['cookie']),
    })

    planCodeList.value = data as unknown as FilterDatabase['filter']['Tables']['plan']['Row'][]
  }, {
    immediate: true,
  })

  const { execute: executeSpendCategoryCodeList } = useAsyncData('spendCategoryCodeList', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'spendCategory',
      },
      headers: useRequestHeaders(['cookie']),
    })

    spendCategoryCodeList.value = data as unknown as FilterDatabase['filter']['Tables']['spendCategory']['Row'][]
  }, {
    immediate: true,
  })

  const { execute: executeEndDateCodeList } = useAsyncData('endDateCodeList', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'endDate',
      },
      headers: useRequestHeaders(['cookie']),
    })

    endDateCodeList.value = data as unknown as FilterDatabase['filter']['Tables']['endDate']['Row'][]
  }, {
    immediate: true,
  })

  const { execute: executeLocalTimezone } = useAsyncData('localTimezone', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'localTimezone',
      },
      headers: useRequestHeaders(['cookie']),
    })

    localTimezone.value = data as unknown as FilterDatabase['filter']['Tables']['localTimezone']['Row'][]
  }, {
    immediate: true,
  })

  const executeFilterData = async () => {
    await executeCurrencyCodeList()
    await executePlanCodeList()
    await executeSpendCategoryCodeList()
    await executeEndDateCodeList()
    await executeLocalTimezone()
  }

  return {
    executeFilterData,
  }
}
