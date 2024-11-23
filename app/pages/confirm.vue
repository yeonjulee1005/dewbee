<script setup lang="ts">
const { t } = useCustomLocale()
const toast = useToast()

const user = useSupabaseUser()

const { logout } = useFetchComposable()
const { userData, userCoreId, currentLocalTimezoneOffset } = storeToRefs(useUserDataStore())

const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`, { sameSite: 'lax', secure: true }).value

useHead({
  title: t('pageTitle.login'),
})

definePageMeta({
  layout: 'center',
})

const loadUserData = async () => {
  const { data } = await useFetch('/api/profiles', {
    headers: useRequestHeaders(['cookie']),
  })

  userData.value = data.value as unknown as Database['public']['Tables']['profiles']['Row']
  userCoreId.value = userData.value?.id ?? ''
  currentLocalTimezoneOffset.value = userData.value?.localTimezone.utc_offset ?? 0
}

watch(user, async () => {
  if (!user.value) return
  await loadUserData()

  if (userData.value?.deleted) {
    toast.add({ title: t('message.alreadyWithdrawal.title'), description: t('message.alreadyWithdrawal.description'), color: 'error' })
    await logout()
    return navigateTo('/')
  }

  toast.add({ title: t('message.loginSuccess.title'), description: t('message.loginSuccess.description'), color: 'success' })
  useCookie(`${cookieName}-redirect-path`).value = null
  return navigateTo(redirectPath)
}, {
  immediate: true,
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Icon
      name="i-svg-spinners-pulse-multiple"
      class="w-28 h-28"
    />
  </div>
</template>
