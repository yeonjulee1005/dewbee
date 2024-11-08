export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (..._args) => {
    if (import.meta.client) {
      console.log('vue:error')
      console.log(..._args)
    }
  })
  nuxtApp.hook('app:rendered', (..._args) => {
    if (import.meta.client) {
      console.log('app:rendered')
      console.log(..._args)
    }
  })
  nuxtApp.hook('app:error', (..._args) => {
    if (import.meta.client) {
      console.log('app:error')
      console.log(..._args)
    }
  })
  nuxtApp.vueApp.config.errorHandler = (..._args) => {
    if (import.meta.client) {
      console.log('errorhandler')
      console.log(..._args)
    }
  }
})
