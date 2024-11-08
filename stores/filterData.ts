import { defineStore } from 'pinia'
import type { FilterDatabase } from '@/types/supabaseFilter'

export const useFilterDataStore = defineStore('filterDataStore', () => {
  /**
   * ! Pinia State !
   *
   * @param currencyCodeList 화폐 코드 목록
   * @param planCodeList 요금제 코드 목록
   * @param spendCategoryCodeList 지출 카테고리 코드 목록
   * @param startDateCodeList 시작일자 코드 목록
   *
   */

  const currencyCodeList = ref<FilterDatabase['filter']['Tables']['currency']['Row'][]>([])
  const planCodeList = ref<FilterDatabase['filter']['Tables']['plan']['Row'][]>([])
  const spendCategoryCodeList = ref<FilterDatabase['filter']['Tables']['spendCategory']['Row'][]>([])
  const startDateCodeList = ref<FilterDatabase['filter']['Tables']['startDate']['Row'][]>([])

  return {
    currencyCodeList,
    planCodeList,
    spendCategoryCodeList,
    startDateCodeList,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})
