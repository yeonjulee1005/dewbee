export const useWindowStore = defineStore('useWindowStore', () => {
  /**
   * ! Pinia State !
   *
   * @param windowSize 창 사이즈
   * @param mobileOperationSystem 모바일 운영체제
   *
   */

  const windowSize = ref(0)
  const mobileOperationSystem = ref<'ios' | 'android' | ''>('')

  return {
    windowSize,
    mobileOperationSystem,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
})
