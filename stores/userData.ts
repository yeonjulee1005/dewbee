import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userDataStore', () => {
  /**
   * ! Pinia State !
   *
   * @param userData 사용자 정보
   * @param userCoreId 사용자 UID
   * @param currentLocalTimezoneOffset 사용자 현재 지역 시간 오프셋
   *
   */

  const userData = ref()
  const userCoreId = ref('')
  const currentLocalTimezoneOffset = ref(0)

  return {
    userCoreId,
    userData,
    currentLocalTimezoneOffset,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
})
