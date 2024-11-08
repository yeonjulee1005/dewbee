export const useLoadUserData = () => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  const toast = useToast()

  const { userData, userCoreId } = storeToRefs(useUserDataStore())

  const { refresh: refreshUserData, execute: excuteUserData } = useAsyncData('storeUserData', async () => {
    if (!user.value?.id) {
      return {}
    }

    const { data, error } = await client
      .from('viewProfiles')
      .select('*')
      .eq('id', user.value?.id)
      .single()

    if (error) {
      toast.add({ title: error.message, description: 'at fetch userData', color: 'error' })
    }

    userData.value = data as SerializeObject
    userCoreId.value = userData.value?.id ?? ''

    return data
  }, {
    immediate: true,
  })

  return {
    excuteUserData,
    refreshUserData,
  }
}
