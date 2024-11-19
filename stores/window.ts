export const useWindowStore = defineStore('windowStore', () => {
  /**
   * ! Pinia State !
   *
   * @param windowSize 창 사이즈
   *
   */

  const windowSize = ref(0)

  return {
    windowSize,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})
