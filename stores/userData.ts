import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userDataStore', () => {
  /**
   * ! Pinia State !
   *
   * @param userCoreId 사용자 UID
   * @param userData 사용자 정보
   *
   */

  const userCoreId = ref('')
  const userData = ref()

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
