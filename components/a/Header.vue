<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const user = useSupabaseUser()

const { go } = useRouter()
const { t, locale, setLocale } = useLocale()
const ccolorMode = useColorMode()

const { logout } = useFetchComposable()

const items = ref<DropdownMenuItem[] | DropdownMenuItem[][]>([
  [
    {
      label: t('menu.settings'),
      icon: 'i-lucide-settings-2',
      kbds: ['ctrl', 's'],
      to: '/settings',
    },
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
  [
    {
      label: t('menu.inquiry'),
      icon: 'i-lucide-message-circle-more',
      kbds: ['ctrl', 'i'],
      to: '/settings/inquiry',
    },
    {
      label: t('menu.plan'),
      icon: 'i-lucide-crown',
      kbds: ['ctrl', 'p'],
      to: '/settings/plan',
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

    items.value.push([{
      label: t('menu.signout'),
      icon: 'i-lucide-log-out',
      onSelect: logoutProcess,
    }])
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
  ctrl_p: () => {
    navigateTo('/plan')
  },
  ctrl_s: () => {
    navigateTo('/settings')
  },
  ctrl_t: () => {
    navigateTo('/settings/theme')
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
  <div class="w-full flex justify-end px-3 py-2 ring-2 ring-amber-500">
    <UDropdownMenu
      v-model:open="dropdownMenuTrigger"
      :items="items"
      size="lg"
      arrow
      :content="{ side: 'bottom', align: 'start' }"
      class="min-w-48"
    >
      <AButton
        use-leading
        round-button
        :shortcuts-text="['t']"
        button-rounded="rounded-xl"
        button-variant="outline"
        image-url="/image/favicon.svg"
      />
    </UDropdownMenu>
  </div>
</template>
