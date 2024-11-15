<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { go } = useRouter()
const { t, locale, setLocale } = useLocale()
const ccolorMode = useColorMode()

const { userData, userCoreId } = storeToRefs(useUserDataStore())
const { logout } = useFetchComposable()

const menuItems = ref<DropdownMenuItem[] | DropdownMenuItem[][]>([
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
  [
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
    {
      label: t('menu.familyService'),
      icon: 'i-lucide-box',
      kbds: ['ctrl', 'f'],
      to: '/family',
    },
  ],
])

const dropdownMenuTrigger = ref(false)

const checkLoginState = () => {
  userData.value
    ? insertLoginMenu()
    : insertLogoutMenu()
}

const insertLoginMenu = () => {
  userData.value.plan.code === 'PNC001'
    ? insertFreePlanMenu()
    : insertProPlanMenu()

  menuItems.value.push([
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

const insertFreePlanMenu = () => {
  menuItems.value.unshift(
    [{
      label: t('menu.profile'),
      icon: 'i-lucide-user',
      kbds: ['ctrl', 'meta', 'p'],
      to: '/settings/profile',
    }],
    [
      {
        label: t('menu.main'),
        icon: 'i-lucide-home',
        kbds: ['ctrl', 'm'],
        to: '/',
      },
      {
        label: t('menu.records.label'),
        icon: 'i-lucide-dollar-sign',
        children: [
          {
            label: t('menu.records.weekly'),
            icon: 'i-lucide-calendar',
            kbds: ['ctrl', 'meta', 'w'],
            onSelect: () => {
              navigateTo('/records/weekly')
            },
          },
        ],
      },
      {
        label: t('menu.plan'),
        icon: 'i-lucide-crown',
        kbds: ['ctrl', 'p'],
        to: '/plan',
      },
    ],
  )
}

const insertProPlanMenu = () => {
  menuItems.value.unshift(
    [{
      label: t('menu.profile'),
      icon: 'i-lucide-user',
      kbds: ['ctrl', 'meta', 'p'],
      to: '/settings/profile',
    }],
    [
      {
        label: t('menu.main'),
        icon: 'i-lucide-home',
        kbds: ['ctrl', 'm'],
        to: '/',
      },
      {
        label: t('menu.records.label'),
        icon: 'i-lucide-dollar-sign',
        children: [
          {
            label: t('menu.records.realtime'),
            icon: 'i-lucide-zap',
            kbds: ['ctrl', 'meta', 'r'],
            onSelect: () => {
              navigateTo('/records/realtime')
            },
          },
          {
            label: t('menu.records.daily'),
            icon: 'i-lucide-alarm-clock',
            kbds: ['ctrl', 'meta', 'd'],
            onSelect: () => {
              navigateTo('/records/daily')
            },
          },
          {
            label: t('menu.records.weekly'),
            icon: 'i-lucide-calendar',
            kbds: ['ctrl', 'meta', 'w'],
            onSelect: () => {
              navigateTo('/records/weekly')
            },
          },
        ],
      },
      {
        label: t('menu.plan'),
        icon: 'i-lucide-crown',
        kbds: ['ctrl', 'p'],
        to: '/plan',
      },
    ],
  )
}

const insertLogoutMenu = () => {
  menuItems.value.unshift(
    [
      {
        label: t('menu.main'),
        icon: 'i-lucide-home',
        kbds: ['ctrl', 'm'],
        to: '/',
      },
    ],
  )

  menuItems.value.push([{
    label: t('menu.signin'),
    icon: 'i-lucide-log-in',
    kbds: ['ctrl', 'l'],
    to: '/login',
  }])
}

const computedAvatarUrl = computed(() => userData.value?.avatar_url ?? '/image/favicon.svg')

defineShortcuts(
  extractShortcuts(menuItems.value),
)

defineShortcuts({
  ctrl_f: () => navigateTo('/family'),
  ctrl_i: () => navigateTo('/settings/inquiry'),
  ctrl_l: () => navigateTo('/login'),
  ctrl_m: () => navigateTo('/'),
  ctrl_p: () => navigateTo('/plan'),
  ctrl_s: () => navigateTo('/settings'),
  ctrl_t: () => navigateTo('/settings/theme'),
  ctrl_n: () => navigateTo('/settings/patch'),
  ctrl_meta_e: () => navigateTo('/records/daily'),
  ctrl_meta_k: () => ccolorMode.preference = 'dark',
  ctrl_meta_l: () => ccolorMode.preference = 'light',
  ctrl_meta_p: () => navigateTo('/settings/profile'),
  ctrl_meta_r: () => navigateTo('/records/realtime'),
  ctrl_meta_s: () => ccolorMode.preference = 'system',
  ctrl_meta_w: () => navigateTo('/records/weekly'),
  shift_meta_l: () => ccolorMode.preference = 'light',
  shift_meta_d: () => ccolorMode.preference = 'dark',
  shift_meta_s: () => ccolorMode.preference = 'system',
  shift_meta_k: () => setLocale('ko'),
  shift_meta_e: () => setLocale('en'),
})

const logoutProcess = () => {
  menuItems.value.splice(0, 2)
  menuItems.value.pop()
  insertLogoutMenu()

  userData.value = null
  userCoreId.value = ''
  logout()
}

watch(() => locale.value, () => {
  go(0)
})

onMounted(() => {
  checkLoginState()
})
</script>

<template>
  <div class="sticky top-0 left-0 w-full flex justify-end items-center px-4 py-3">
    <UDropdownMenu
      v-model:open="dropdownMenuTrigger"
      :items="menuItems"
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
          src: computedAvatarUrl,
          size: 'xl',
        }"
        button-variant="outline"
      />
    </UDropdownMenu>
  </div>
</template>
