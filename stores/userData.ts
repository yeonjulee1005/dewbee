import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userDataStore', () => {
  /**
   * ! Pinia State !
   *
   * @param userData 사용자 정보
   * @param userCoreId 사용자 UID
   *
   */

  const userData = ref()
  const userCoreId = ref('')

  watch(userData, () => {
    if (userData.value) {
      userCoreId.value = userData.value?.id ?? ''
    }
  }, {
    immediate: true,
  })

  return {
    userCoreId,
    userData,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})
