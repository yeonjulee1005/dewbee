<script setup lang="ts">
import { track } from '@vercel/analytics'

const { auth } = useSupabaseClient()

const { t } = useLocale()
const toast = useToast()
const config = useRuntimeConfig()
const { url } = useImageStorage()

const { windowSize } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.login'),
})

const loginButton = ref<{ provider: 'kakao' | 'google' | 'github' | 'linkedin_oidc', icon: string, text: string }[]>([
  {
    provider: 'kakao',
    icon: 'i-simple-icons-kakaotalk',
    text: 'Kakao',
  },
  {
    provider: 'google',
    icon: 'i-devicon-google',
    text: 'Google',
  },
  {
    provider: 'github',
    icon: 'i-devicon-github',
    text: 'GitHub',
  },
  {
    provider: 'linkedin_oidc',
    icon: 'i-devicon-linkedin',
    text: 'LinkedIn',
  },
])

const getUrl = () => {
  let url = config.public.siteUrl ?? 'http://localhost:5000/'
  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url.concat('confirm')
}

const userLogin = async (provider: 'kakao' | 'google' | 'github' | 'linkedin_oidc') => {
  track('Login Provider', { provider })

  if (provider === 'google' && navigator.userAgent.indexOf('NAVER(inapp;') === 0) {
    toast.add({ title: t('message.naverNoUseGoogle'), color: 'info' })
    return
  }

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
        :src="url(true, '/assets/dewbee_logo.svg')"
        :height="180"
        :width="180"
      />
      <div class="text-2xl font-black">
        {{ $t('pageTitle.login') }}
      </div>
    </div>
    <USeparator />
    <div class="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
      <AButton
        v-for="(button, index) in loginButton"
        :key="index"
        :custom-class="windowSize < 768 ? 'w-full flex items-center justify-center' : ''"
        button-variant="soft"
        button-size="xl"
        color="neutral"
        button-rounded="rounded-xl"
        use-leading
        :icon-lead-name="button.icon"
        icon-lead-class="w-8 h-8"
        :button-text="button.text"
        @click="userLogin(button.provider)"
      />
    </div>
    <ULink
      to="/policy"
      target="_blank"
    >
      {{ $t('menu.policy') }}
    </ULink>
  </div>
</template>
