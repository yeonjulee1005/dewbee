<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const user = useSupabaseUser()

const config = useRuntimeConfig()
const { fullPath } = useRoute()
const ccolorMode = useColorMode()
const { go } = useRouter()
const { t, locale, setLocale } = useCustomLocale()
const { url } = useImageStorage()

const { userData, userCoreId } = storeToRefs(useUserDataStore())
const { logout } = useFetchComposable()

useCookie(`${config.public.supabase.cookieName}-redirect-path`).value = fullPath

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
      to: '/inquiry',
    },
    {
      label: t('menu.patchNote'),
      icon: 'i-lucide-notebook-pen',
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
  user.value
    ? insertLoginMenu()
    : insertLogoutMenu()
}

const insertLoginMenu = () => {
  insertProPlanMenu()
  // userData.value.plan.code === 'PNC001'
  //   ? insertFreePlanMenu()
  //   : insertProPlanMenu()

  menuItems.value.push(
    [
      {
        label: t('menu.profile'),
        icon: 'i-lucide-user',
        kbds: ['ctrl', 'meta', 'p'],
        to: '/settings/profile',
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

// const insertFreePlanMenu = () => {
//   menuItems.value.unshift(
//     [
//       {
//         label: t('menu.main'),
//         icon: 'i-lucide-home',
//         kbds: ['ctrl', 'm'],
//         to: '/',
//       },
//       {
//         label: t('menu.records.label'),
//         icon: 'i-lucide-dollar-sign',
//         children: [
//           {
//             label: t('menu.records.weekly'),
//             icon: 'i-lucide-calendar',
//             kbds: ['ctrl', 'meta', 'w'],
//             onSelect: () => {
//               navigateTo('/records/weekly')
//             },
//           },
//         ],
//       },
//       // {
//       //   label: t('menu.plan'),
//       //   icon: 'i-lucide-crown',
//       //   kbds: ['ctrl', 'p'],
//       //   to: '/plan',
//       // },
//     ],
//   )
// }

const insertProPlanMenu = () => {
  menuItems.value.unshift(
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
          {
            label: t('menu.records.statistics'),
            icon: 'i-lucide-chart-spline',
            kbds: ['ctrl', 'meta', 's'],
            onSelect: () => {
              navigateTo('/records/statistics')
            },
          },
        ],
      },
      // {
      //   label: t('menu.plan'),
      //   icon: 'i-lucide-crown',
      //   kbds: ['ctrl', 'p'],
      //   to: '/plan',
      // },
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

const computedAvatarUrl = computed(() => userData.value?.avatar_url ?? url(true, '/assets/dewbee_logo.webp'))

defineShortcuts(
  extractShortcuts(menuItems.value),
)

defineShortcuts({
  ctrl_f: () => navigateTo('/family'),
  ctrl_i: () => navigateTo('/inquiry'),
  ctrl_l: () => navigateTo('/login'),
  ctrl_m: () => navigateTo('/'),
  // ctrl_p: () => navigateTo('/plan'),
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
  ctrl_meta_z: () => navigateTo('/records/statistics'),
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

checkLoginState()
</script>

<template>
  <div class="fixed w-dvw lg:w-[800px] top-0 flex justify-end mt-10 px-6 py-5 z-10">
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
          alt: 'Avatar',
        }"
        button-variant="outline"
      />
    </UDropdownMenu>
  </div>
</template>
