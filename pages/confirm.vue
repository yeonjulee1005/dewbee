<script setup lang="ts">
const { t } = useLocale()
const toast = useToast()

const user = useSupabaseUser()

const { logout } = useFetchComposable()
const { userData } = storeToRefs(useUserDataStore())

const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`, { sameSite: 'lax', secure: true }).value

useHead({
  title: t('pageTitle.login'),
})

definePageMeta({
  layout: 'center',
})

watch(user, async () => {
  if (!user.value) return

  if (userData.value?.deleted) {
    toast.add({ title: t('message.alreadyWithdrawal.title'), description: t('message.alreadyWithdrawal.description'), color: 'error' })
    await logout()
    return navigateTo('/')
  }

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
