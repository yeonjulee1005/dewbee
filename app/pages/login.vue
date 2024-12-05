<script setup lang="ts">
import { track } from '@vercel/analytics'

const { auth } = useSupabaseClient()

const { t } = useCustomLocale()
const toast = useToast()
const config = useRuntimeConfig()
const { url } = useImageStorage()

const { windowSize, mobileOperationSystem } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.login'),
  meta: [{ name: 'description', content: t('pageDescription.login') }],
})

const loginButton = ref<{ provider: 'kakao' | 'apple' | 'google' | 'github' | 'linkedin_oidc', icon: string, text: string }[]>([
  {
    provider: 'kakao',
    icon: 'i-simple-icons-kakaotalk',
    text: 'Kakao',
  },
  {
    provider: 'apple',
    icon: 'i-simple-icons-apple',
    text: 'Apple',
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
  let url = config.public.siteUrl ?? 'http://localhost:4003/'
  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url.concat('confirm')
}

const userLogin = async (provider: 'kakao' | 'apple' | 'google' | 'github' | 'linkedin_oidc') => {
  track('Login Provider', { provider })

  if (provider === 'google' && navigator.userAgent.indexOf('NAVER(inapp;') === 0) {
    toast.add({ title: t('message.naverNoUseGoogle'), color: 'info' })
    return
  }

  switch (provider) {
    case 'apple':
      loginOauthApple(provider)
      break
    default:
      loginOAuth(provider)
      break
  }
}

const loginOauthApple = async (provider: 'apple') => {
  await auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getUrl(),
    },
  })
}

const loginOAuth = async (provider: 'kakao' | 'google' | 'github' | 'linkedin_oidc') => {
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
  <div class="h-dvh w-full sm:w-[564px] flex flex-col items-center justify-center gap-y-6 px-6 pb-6">
    <div class="flex flex-col items-center gap-y-3">
      <NuxtImg
        :src="url(true, '/assets/dewbee_logo.webp')"
        :height="180"
        :width="180"
        loading="lazy"
        placeholder
        format="webp"
        alt="DewBee Logo"
      />
      <div class="text-2xl font-black">
        {{ $t('pageTitle.login') }}
      </div>
    </div>
    <USeparator />
    <div class="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
      <ClientOnly>
        <template #default>
          <AButton
            v-for="(button, index) in loginButton"
            :key="index"
            :custom-class="windowSize < 768 ? 'w-full flex items-center justify-center' : ''"
            :class="{ hidden: mobileOperationSystem === 'android' && button.provider === 'google' }"
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
        </template>
        <template #fallback>
          <UCard :ui="{ root: 'w-full h-[240px] md:h-[48px] ring ring-neutral-400 dark:ring-neutral-600 animate-pulse' }" />
        </template>
      </ClientOnly>
    </div>
    <ULink
      to="/policy"
      target="_blank"
    >
      {{ $t('menu.policy') }}
    </ULink>
  </div>
</template>
