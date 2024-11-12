<script setup lang="ts">
import { track } from '@vercel/analytics'

const { width } = useWindowSize()

const { t } = useLocale()
const toast = useToast()
const config = useRuntimeConfig()

const { auth } = useSupabaseClient()

useHead({
  title: t('pageTitle.login'),
})

const getUrl = () => {
  let url = config.public.siteUrl ?? 'http://localhost:5000/'
  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url.concat('confirm')
}

const userLogin = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
  track('Login Provider', { provider })

  const { error } = await auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getUrl(),
    },
  })

  if (error) {
    toast.add({ title: t('message.loginFailed.title'), description: t('message.loginFailed.description'), color: 'error' })
    return
  }
}
</script>

<template>
  <div class="h-dvh w-full sm:w-[500px] flex flex-col items-center justify-center gap-y-6 px-6">
    <div class="flex flex-col items-center gap-y-3">
      <NuxtImg
        src="/image/favicon.svg"
        :height="180"
        :width="180"
      />
      <div class="text-2xl font-black">
        {{ $t('pageTitle.login') }}
      </div>
    </div>
    <USeparator />
    <div class="w-full flex items-center justify-center gap-x-4">
      <AButton
        button-variant="soft"
        button-size="xl"
        color="neutral"
        button-rounded="rounded-xl"
        use-leading
        icon-lead-name="i-devicon-google"
        icon-lead-class="w-8 h-8"
        :button-text="width < 768 ? '' : 'Google'"
        @click="userLogin('google')"
      />
      <AButton
        button-variant="soft"
        button-size="xl"
        color="neutral"
        button-rounded="rounded-xl"
        use-leading
        icon-lead-name="i-devicon-github"
        icon-lead-class="w-8 h-8"
        :button-text="width < 768 ? '' : 'GitHub'"
        @click="userLogin('github')"
      />
      <AButton
        button-variant="soft"
        button-size="xl"
        color="neutral"
        button-rounded="rounded-xl"
        use-leading
        icon-lead-name="i-devicon-linkedin"
        icon-lead-class="w-8 h-8"
        :button-text="width < 768 ? '' : 'LinkedIn'"
        @click="userLogin('linkedin_oidc')"
      />
    </div>
  </div>
</template>
