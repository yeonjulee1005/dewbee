<script setup lang="ts">
const { t } = useLocale()
const toast = useToast()

const config = useRuntimeConfig()

const { schemaFetchRangeData } = useFetchComposable()
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

  const { data: response, count } = await schemaFetchRangeData('board', 'guestInquiry', '*', pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, true), pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, false))

  return response
    ? { list: response, count }
    : { list: [], count: 0 }
}, {
  immediate: true,
  watch: [guestInquiryCurrentPage],
})

const { data: memberInquiryData, execute: executeMemberInquiryList, pending: pendingMemberInquiryList } = useAsyncData('memberInquiryData', async () => {
  if (user.value?.id !== config.public.adminUid) {
    return { list: [], count: 0 }
  }

  const { data: response, count } = await schemaFetchRangeData('board', 'viewInquiryChannel', '*', pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, true), pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, false))

  return response
    ? { list: response, count }
    : { list: [], count: 0 }
}, {
  immediate: true,
  watch: [guestInquiryCurrentPage],
})

const { data: userInquiryData, execute: executeUserInquiryList, pending: pendingUserInquiryList } = useAsyncData('userInquiryData', async () => {
  if (!user.value || user.value.id === config.public.adminUid) {
    return { list: [], count: 0 }
  }

  const { data: response, count } = await schemaFetchRangeData('board', 'viewInquiryChannel', '*', pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, true), pageCalc(guestInquiryCurrentPage.value, guestInquiryPageSize.value, false), 'request_user_id', user.value?.id)

  return response
    ? { list: response, count }
    : { list: [], count: 0 }
}, {
  immediate: true,
  watch: [userInquiryCurrentPage],
})

const clickInquiryButton = async () => {
  const response = await schemaUpsertData('board', 'inquiryChannel', { request_user_id: user.value?.id })

  if (response) {
    await schemaUpdateData('board', 'inquiryChannel', { channel_code: response[0].id.split('-')[0].toUpperCase() }, response[0].id)
    toast.add({ title: t('message.successInquiryChannelCreated'), color: 'success' })
    executeUserInquiryList()
  }
}

const replyInquiry = (list: any) => {
  console.log('메일 문의 하기')
  console.log(list)
}

const moveToInquiryChatAdmin = (list: any) => {
  console.log('문의 채팅으로 이동 관리자모드')
  console.log(list)
}

const moveToInquiryChatMember = (list: any) => {
  console.log('문의 채팅으로 이동 회원모드')
  console.log(list)
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
            v-model:list-current-page="guestInquiryCurrentPage"
            list-type="adminGuest"
            :list-pending="pendingGuestInquiryList"
            :list-data="guestInquiryData"
            :page-size="guestInquiryPageSize"
            @reply:admin-guest="replyInquiry"
          />
        </template>
        <template #memberInquiry>
          <InquiryList
            v-model:list-current-page="memberInquiryCurrentPage"
            list-type="adminMember"
            :list-pending="pendingMemberInquiryList"
            :list-data="memberInquiryData"
            :page-size="memberInquiryPageSize"
            @move:chat-admin="moveToInquiryChatAdmin"
          />
        </template>
      </UTabs>
      <InquiryList
        v-else
        v-model:list-current-page="userInquiryCurrentPage"
        list-type="member"
        :list-pending="pendingUserInquiryList"
        :list-data="userInquiryData"
        :page-size="userInquiryPageSize"
        @move:chat-member="moveToInquiryChatMember"
      />
    </div>
    <InquiryGuestWrite v-else />
  </div>
</template>
