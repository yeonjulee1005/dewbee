import { defineStore } from 'pinia'
import type { FilterDatabase } from '@/types/supabaseFilter'

export const useFilterDataStore = defineStore('filterDataStore', () => {
  /**
   * ! Pinia State !
   *
   * @param currencyCodeList 화폐 코드 목록
   * @param planCodeList 요금제 코드 목록
   * @param spendCategoryCodeList 지출 카테고리 코드 목록
   * @param endDateCodeList 종료일자 코드 목록
   * @param localTimezone 로컬 시간대
   * @param endDateTimestampz 종료일자 타임스탬프
   * @param weekBeforeTimestampz 종료일자 D-7 타임스탬프
   *
   */

  const currencyCodeList = ref<FilterDatabase['filter']['Tables']['currency']['Row'][]>([])
  const planCodeList = ref<FilterDatabase['filter']['Tables']['plan']['Row'][]>([])
  const spendCategoryCodeList = ref<FilterDatabase['filter']['Tables']['spendCategory']['Row'][]>([])
  const endDateCodeList = ref<FilterDatabase['filter']['Tables']['endDate']['Row'][]>([])
  const localTimezone = ref<FilterDatabase['filter']['Tables']['localTimezone']['Row'][]>([])
  const endDateTimestampz = ref('')
  const weekBeforeTimestampz = ref('')

  return {
    currencyCodeList,
    planCodeList,
    spendCategoryCodeList,
    endDateCodeList,
    localTimezone,
    endDateTimestampz,
    weekBeforeTimestampz,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
})
