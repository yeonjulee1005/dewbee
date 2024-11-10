<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const user = useSupabaseUser()

const { go } = useRouter()
const { t, locale, setLocale } = useLocale()
const ccolorMode = useColorMode()

const { userData, userCoreId } = storeToRefs(useUserDataStore())
const { logout } = useFetchComposable()

const items = ref<DropdownMenuItem[] | DropdownMenuItem[][]>([
  [
    {
      label: t('menu.main'),
      icon: 'i-lucide-home',
      kbds: ['ctrl', 'm'],
      to: '/',
    },
    {
      label: t('menu.inquiry'),
      icon: 'i-lucide-message-circle-more',
      kbds: ['ctrl', 'i'],
      to: '/settings/inquiry',
    },
    {
      label: t('menu.patchNote'),
      icon: 'i-lucide-message-circle-more',
      kbds: ['ctrl', 'n'],
      to: '/settings/patch',
    },
  ],
  [
    {
      label: t('menu.theme.label'),
      icon: 'i-lucide-palette',
      children: [
        {
          label: t('menu.theme.light'),
          icon: 'i-lucide-sun',
          kbds: ['shift', 'meta', 'l'],
          onSelect: () => {
            ccolorMode.preference = 'light'
          },
        },
        {
          label: t('menu.theme.dark'),
          icon: 'i-lucide-moon',
          kbds: ['shift', 'meta', 'd'],
          onSelect: () => {
            ccolorMode.preference = 'dark'
          },
        },
        {
          label: t('menu.theme.system'),
          icon: 'i-lucide-monitor',
          kbds: ['shift', 'meta', 's'],
          onSelect: () => {
            ccolorMode.preference = 'system'
          },
        },
      ],
    },
    {
      label: t('menu.language.label'),
      icon: 'i-lucide-languages',
      children: [
        {
          label: t('menu.language.ko'),
          icon: 'i-flag:kr-4x3',
          kbds: ['shift', 'meta', 'k'],
          onSelect: () => {
            setLocale('ko')
          },
        },
        {
          label: t('menu.language.en'),
          icon: 'i-flag:us-4x3',
          kbds: ['shift', 'meta', 'e'],
          onSelect: () => {
            setLocale('en')
          },
        },
      ],
    },
  ],
])

const dropdownMenuTrigger = ref(false)

const checkLoginState = () => {
  if (user.value) {
    items.value.unshift([{
      label: t('menu.profile'),
      icon: 'i-lucide-user',
      kbds: ['ctrl', 'meta', 'p'],
      to: '/settings/profile',
    }])

    items.value.push([
      {
        label: t('menu.plan'),
        icon: 'i-lucide-crown',
        kbds: ['ctrl', 'p'],
        to: '/settings/plan',
      },
      {
        label: t('menu.settings'),
        icon: 'i-lucide-settings-2',
        kbds: ['ctrl', 's'],
        to: '/settings',
      },
      {
        label: t('menu.signout'),
        icon: 'i-lucide-log-out',
        onSelect: logoutProcess,
      },
    ])
  }
  else {
    items.value.push([{
      label: t('menu.signin'),
      icon: 'i-lucide-log-in',
      kbds: ['ctrl', 'l'],
      to: '/login',
    }])
  }
}

defineShortcuts(
  extractShortcuts(items.value),
)

defineShortcuts({
  ctrl_i: () => {
    navigateTo('/settings/inquiry')
  },
  ctrl_l: () => {
    navigateTo('/login')
  },
  ctrl_m: () => {
    navigateTo('/')
  },
  ctrl_p: () => {
    navigateTo('/plan')
  },
  ctrl_s: () => {
    navigateTo('/settings')
  },
  ctrl_t: () => {
    navigateTo('/settings/theme')
  },
  ctrl_n: () => {
    navigateTo('/settings/patch')
  },
  ctrl_meta_p: () => {
    navigateTo('/settings/profile')
  },
  ctrl_meta_l: () => {
    ccolorMode.preference = 'light'
  },
  ctrl_meta_k: () => {
    ccolorMode.preference = 'dark'
  },
  ctrl_meta_s: () => {
    ccolorMode.preference = 'system'
  },
  shift_meta_l: () => {
    ccolorMode.preference = 'light'
  },
  shift_meta_d: () => {
    ccolorMode.preference = 'dark'
  },
  shift_meta_s: () => {
    ccolorMode.preference = 'system'
  },
  shift_meta_k: () => {
    setLocale('ko')
  },
  shift_meta_e: () => {
    setLocale('en')
  },
})

const logoutProcess = () => {
  items.value.shift()
  items.value.pop()
  userData.value = null
  userCoreId.value = ''
  logout()
}

watch(() => user.value, () => {
  checkLoginState()
})

watch(() => locale.value, () => {
  go(0)
})

checkLoginState()
</script>

<template>
  <div class="sticky top-0 left-0 w-full flex justify-between items-center px-4 py-3">
    <div
      class="text-4xl font-black cursor-pointer hover:text-amber-500 transition-all duration-100 ease-in-out"
      @click="navigateTo('/')"
    >
      {{ $t('pageTitle.dewbee') }}
    </div>
    <UDropdownMenu
      v-model:open="dropdownMenuTrigger"
      :items="items"
      size="xl"
      arrow
      :content="{ side: 'bottom', align: 'start' }"
      class="min-w-48"
    >
      <AButton
        use-leading
        round-button
        :shortcuts-text="['t']"
        custom-class="ring-2 cursor-pointer"
        button-rounded="rounded-full"
        :image-size="36"
        :button-avatar="{
          src: user?.id ? userData?.avatar_url ?? '/image/favicon.svg' : '/image/favicon.svg',
          size: 'xl',
        }"
        button-variant="outline"
      />
    </UDropdownMenu>
  </div>
</template>
