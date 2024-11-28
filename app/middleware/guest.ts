export default defineNuxtRouteMiddleware((_to, _from) => {
  const user = useSupabaseUser()

  if (user.value) {
    return navigateTo('/')
  }

  watch(user, () => {
    if (user.value) {
      return navigateTo('/')
    }
  }, {
    immediate: true,
  })
})
