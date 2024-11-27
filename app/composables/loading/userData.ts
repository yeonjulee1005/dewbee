export const useLoadUserData = () => {
  const { userData, userCoreId, currentLocalTimezoneOffset } = storeToRefs(useUserDataStore())

  const { refresh: refreshUserData, execute: executeUpdateData, pending: pendingUpdateData } = useAsyncData('storeUserData', async () => {
    const { data } = await useFetch('/api/profiles', {
      headers: useRequestHeaders(['cookie']),
    })

    userData.value = data.value as unknown as Database['public']['Tables']['profiles']['Row']
    userCoreId.value = userData.value?.id ?? ''
    currentLocalTimezoneOffset.value = userData.value?.localTimezone.utc_offset ?? 0

    return data
  }, {
    immediate: true,
  })

  return {
    executeUpdateData,
    refreshUserData,
    pendingUpdateData,
  }
}
