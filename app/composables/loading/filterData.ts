import type { FilterDatabase } from '@/types/supabaseFilter'

export const useLoadFilterData = () => {
  const { schemaFetchData } = useFetchComposable()

  const { currencyCodeList, planCodeList, spendCategoryCodeList, startDateCodeList } = storeToRefs(useFilterDataStore())

  const { execute: executeCurrencyCodeList } = useAsyncData('currencyCodeList', async () => {
    const result = await schemaFetchData('filter', 'currency', 'id, index, code, code_name', 'index', true)
    currencyCodeList.value = result as FilterDatabase['filter']['Tables']['currency']['Row'][]

    return result ?? []
  }, {
    immediate: true,
  })

  const { execute: executePlanCodeList } = useAsyncData('planCodeList', async () => {
    const result = await schemaFetchData('filter', 'plan', 'id, index, code, code_name', 'index', true)
    planCodeList.value = result as FilterDatabase['filter']['Tables']['plan']['Row'][]

    return result ?? []
  }, {
    immediate: true,
  })

  const { execute: executeSpendCategoryCodeList } = useAsyncData('spendCategoryCodeList', async () => {
    const result = await schemaFetchData('filter', 'spendCategory', 'id, index, code, code_name, icon_name', 'index', true)
    spendCategoryCodeList.value = result as FilterDatabase['filter']['Tables']['spendCategory']['Row'][]

    return result ?? []
  }, {
    immediate: true,
  })

  const { execute: executeStartDateCodeList } = useAsyncData('startDateCodeList', async () => {
    const result = await schemaFetchData('filter', 'startDate', 'id, index, code, code_name', 'index', true)
    startDateCodeList.value = result as FilterDatabase['filter']['Tables']['startDate']['Row'][]

    return result ?? []
  }, {
    immediate: true,
  })

  const executeFilterData = async () => {
    await executeCurrencyCodeList()
    await executePlanCodeList()
    await executeSpendCategoryCodeList()
    await executeStartDateCodeList()
  }

  return {
    executeFilterData,
  }
}