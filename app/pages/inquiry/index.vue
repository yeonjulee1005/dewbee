<script setup lang="ts">
import type { BoardDatabase } from '@/types/supabaseBoard'

const { t } = useCustomLocale()
const toast = useToast()

const config = useRuntimeConfig()

const { schemaUpsertData, schemaUpdateData } = useUpdateComposable()

const user = useSupabaseUser()

useHead({
  title: t('pageTitle.inquiry'),
})

const inquiryTabs = ref([
  {
    label: '게스트 문의내역',
    icon: 'i-lucide-message-circle',
    slot: 'guestInquiry',
  },
  {
    label: '회원 문의내역',
    icon: 'i-lucide-message-circle',
    slot: 'memberInquiry',
  },
])

const guestInquiryCurrentPage = ref(1)
const guestInquiryPageSize = ref(5)

const memberInquiryCurrentPage = ref(1)
const memberInquiryPageSize = ref(5)

const userInquiryCurrentPage = ref(1)
const userInquiryPageSize = ref(5)

const pageCalc = (page: number, pageCount: number, firstRange: boolean): number => {
  return firstRange
    ? (page - 1) * pageCount
    : (page * pageCount) - 1
}

const { data: guestInquiryData, execute: executeGuestInquiryList, pending: pendingGuestInquiryList } = useAsyncData('guestInquiryData', async () => {
  if (user.value?.id !== config.public.adminUid) {
    return { list: [], count: 0 }
  }

  const { data }: SerializeObject = await useFetch('/api/pagination/guest', {
    query: {
      schema: 'board',
      tableName: 'guestInquiry',
      startPage: pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, true),
      endPage: pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, false),
    },
    headers: useRequestHeaders(['cookie']),
  })

  return data.value
    ? { list: data.value.data, count: data.value.count }
    : { list: [], count: 0 }
}, {
  immediate: true,
  watch: [guestInquiryCurrentPage],
})

const { data: memberInquiryData, execute: executeMemberInquiryList, pending: pendingMemberInquiryList } = useAsyncData('memberInquiryData', async () => {
  if (user.value?.id !== config.public.adminUid) {
    return { list: [], count: 0 }
  }

  const { data }: SerializeObject = await useFetch('/api/pagination/guest', {
    query: {
      schema: 'board',
      tableName: 'viewInquiryChannel',
      startPage: pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, true),
      endPage: pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, false),
      ascending: 'activated',
    },
    headers: useRequestHeaders(['cookie']),
  })

  return data.value
    ? { list: data.value.data, count: data.value.count }
    : { list: [], count: 0 }
}, {
  immediate: true,
  watch: [guestInquiryCurrentPage],
})

const { data: userInquiryData, execute: executeUserInquiryList, pending: pendingUserInquiryList } = useAsyncData('userInquiryData', async () => {
  if (!user.value || user.value.id === config.public.adminUid) {
    return { list: [], count: 0 }
  }

  const { data }: SerializeObject = await useFetch('/api/pagination', {
    query: {
      schema: 'board',
      tableName: 'viewInquiryChannel',
      startPage: pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, true),
      endPage: pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, false),
      matchOpt: 'request_user_id',
      ascending: 'activated',
    },
    headers: useRequestHeaders(['cookie']),
  })

  return data.value
    ? { list: data.value.data, count: data.value.count }
    : { list: [], count: 0 }
}, {
  immediate: true,
  watch: [userInquiryCurrentPage],
})

const clickInquiryButton = async () => {
  const response = await schemaUpsertData('board', 'inquiryChannel', { request_user_id: user.value?.id })

  if (response) {
    const channelCode = response[0].id.split('-')[0].toUpperCase()

    await schemaUpdateData('board', 'inquiryChannel', { channel_code: channelCode }, response[0].id)
    toast.add({ title: t('message.successInquiryChannelCreated'), color: 'success' })
    navigateTo({ path: '/inquiry/chat', query: { channelCode } })
  }
}

const replyInquiry = (list: BoardDatabase['board']['Tables']['guestInquiry']['Row']) => {
  const email = list.email
  const subject = encodeURIComponent('[Dewbee] 문의 답변입니다!')
  const body = encodeURIComponent(`문의 내용: \r\n ${list.message ?? ''}`)

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`
  window.open(gmailLink, '_blank')
}

const moveToInquiryChat = (list: BoardDatabase['board']['Views']['viewInquiryChannel']['Row']) => {
  navigateTo({ path: '/inquiry/chat', query: { channelCode: list.channel_code } })
}

onMounted(async () => {
  await executeGuestInquiryList()
  await executeMemberInquiryList()
  await executeUserInquiryList()
})
</script>

<template>
  <div class="relative w-full h-fit flex flex-col justify-center gap-y-8 py-4 pb-6">
    <ASubPageTitle :title="$t('pageTitle.inquiry')" />
    <div
      v-if="user?.id"
      class="w-full flex flex-col items-center gap-y-6 px-6"
    >
      <div class="w-full flex justify-end">
        <AButton
          button-size="xl"
          button-variant="subtle"
          :button-text="$t('button.inquiry')"
          @click="clickInquiryButton"
        />
      </div>
      <UTabs
        v-if="user?.id === config.public.adminUid"
        class="w-full"
        size="xl"
        :items="inquiryTabs"
        :ui="{
          root: 'gap-6',
        }"
      >
        <template #guestInquiry>
          <InquiryList
            v-if="!pendingGuestInquiryList"
            v-model:list-current-page="guestInquiryCurrentPage"
            list-type="adminGuest"
            :list-pending="pendingGuestInquiryList"
            :list-data="guestInquiryData"
            :page-size="guestInquiryPageSize"
            @reply:admin-guest="replyInquiry"
          />
          <div
            v-else
            class="flex justify-center items-center min-h-[300px]"
          >
            <Icon
              name="i-svg-spinners-pulse-multiple"
              class="w-28 h-28"
            />
          </div>
        </template>
        <template #memberInquiry>
          <InquiryList
            v-if="!pendingMemberInquiryList"
            v-model:list-current-page="memberInquiryCurrentPage"
            list-type="adminMember"
            :list-pending="pendingMemberInquiryList"
            :list-data="memberInquiryData"
            :page-size="memberInquiryPageSize"
            @move:chat-admin="moveToInquiryChat"
          />
          <div
            v-else
            class="flex justify-center items-center min-h-[300px]"
          >
            <Icon
              name="i-svg-spinners-pulse-multiple"
              class="w-28 h-28"
            />
          </div>
        </template>
      </UTabs>
      <InquiryList
        v-else-if="!pendingUserInquiryList"
        v-model:list-current-page="userInquiryCurrentPage"
        list-type="member"
        :list-pending="pendingUserInquiryList"
        :list-data="userInquiryData"
        :page-size="userInquiryPageSize"
        @move:chat-member="moveToInquiryChat"
      />
      <div
        v-else
        class="flex justify-center items-center min-h-[300px]"
      >
        <Icon
          name="i-svg-spinners-pulse-multiple"
          class="w-28 h-28"
        />
      </div>
    </div>
    <InquiryGuestWrite v-else />
  </div>
</template>
