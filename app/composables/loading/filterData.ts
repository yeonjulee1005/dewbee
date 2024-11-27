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

    currencyCodeList.value = data.value as unknown as FilterDatabase['filter']['Tables']['currency']['Row'][]

    return data
  }, {
    dedupe: 'defer',
    immediate: true,
  })

  const { execute: executePlanCodeList } = useAsyncData('planCodeList', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'plan',
      },
      headers: useRequestHeaders(['cookie']),
    })

    planCodeList.value = data.value as unknown as FilterDatabase['filter']['Tables']['plan']['Row'][]

    return data
  }, {
    dedupe: 'defer',
    immediate: true,
  })

  const { execute: executeSpendCategoryCodeList } = useAsyncData('spendCategoryCodeList', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'spendCategory',
      },
      headers: useRequestHeaders(['cookie']),
    })

    spendCategoryCodeList.value = data.value as unknown as FilterDatabase['filter']['Tables']['spendCategory']['Row'][]

    return data
  }, {
    dedupe: 'defer',
    immediate: true,
  })

  const { execute: executeEndDateCodeList } = useAsyncData('endDateCodeList', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'endDate',
      },
      headers: useRequestHeaders(['cookie']),
    })

    endDateCodeList.value = data.value as unknown as FilterDatabase['filter']['Tables']['endDate']['Row'][]

    return data
  }, {
    dedupe: 'defer',
    immediate: true,
  })

  const { execute: executeLocalTimezone } = useAsyncData('localTimezone', async () => {
    const { data } = await useFetch('/api/codeLists', {
      query: {
        tableName: 'localTimezone',
      },
      headers: useRequestHeaders(['cookie']),
    })

    localTimezone.value = data.value as unknown as FilterDatabase['filter']['Tables']['localTimezone']['Row'][]

    return data
  }, {
    dedupe: 'defer',
    immediate: true,
  })

  const executeFilterData = async () => {
    await executeSpendCategoryCodeList()
    await executeCurrencyCodeList()
    await executePlanCodeList()
    await executeEndDateCodeList()
    await executeLocalTimezone()
  }

  return {
    executeFilterData,
  }
}
