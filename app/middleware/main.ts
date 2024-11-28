export default defineNuxtRouteMiddleware((_to, _from) => {
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/guest')
  }

  watch(user, () => {
    if (!user.value) {
      return navigateTo('/guest')
    }
  }, {
    immediate: true,
  })
})
