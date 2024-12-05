<script setup lang="ts">
const { t } = useCustomLocale()
const toast = useToast()

const config = useRuntimeConfig()
const { query } = useRoute()

const channelCode = query.channelCode as string

const { schemaUpsertData, schemaUpdateData } = useUpdateComposable()

const { userData } = storeToRefs(useUserDataStore())
const { mobileOperationSystem } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.chat'),
  meta: [{ name: 'description', content: t('pageDescription.chat') }],
})

definePageMeta({
  middleware: 'auth',
})

const chatContainerRef = ref<HTMLElement | null>(null)

const userType = ref('')
const message = ref('')
const composingTrigger = ref(false)

const { data: inquiryChatData, refresh: refreshInquiryChatData, pending: pendingInquiryChatData } = await useAsyncData('inquiryChatData', async () => {
  const { data }: SerializeObject = await useFetch('/api/chat', {
    query: {
      schema: 'board',
      tableName: 'viewInquiryChannel',
      matchOpt: 'channel_code',
      matchOptVal: channelCode,
    },
    headers: useRequestHeaders(['cookie']),
  })

  if (data.value) {
    enterInquiryChat(data.value.id, data.value.request_user_id)
  }

  return data.value
    ? data.value
    : null
}, {
  immediate: true,
})

const enterInquiryChat = async (inquiryChannelId: string, requestUserId: string) => {
  const isAdmin = userData.value?.id !== requestUserId

  const updateData = {
    userType: isAdmin ? 'admin' : 'request',
    messageField: isAdmin ? 'request_new_message' : 'admin_new_message',
  }

  userType.value = updateData.userType
  await schemaUpdateData('board', 'inquiryChannel', { [updateData.messageField]: false }, inquiryChannelId)
}

const onBlur = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  })
}

const handleKeydown = (event: KeyboardEvent) => {
  if (composingTrigger.value) {
    return
  }

  if (!event.shiftKey && event.key === 'Enter') {
    return
  }

  if (event.shiftKey && event.key === 'Enter') {
    event.preventDefault()
    sendMessage()
  }
}

const sendMessage = async () => {
  if (!message.value) {
    return
  }

  const isCloseMessage = message.value.includes('/문의종료') || message.value.includes('/close')

  const upsertPayload = {
    inquiry_id: inquiryChatData.value?.id,
    message: message.value,
    write_type: userType.value,
    update_user_id: userData.value?.id,
  }

  const response = await schemaUpsertData('board', 'inquiryMessageList', upsertPayload)

  if (response) {
    await refreshInquiryChatData()

    userType.value === 'admin'
      ? await schemaUpdateData('board', 'inquiryChannel', { admin_new_message: true }, inquiryChatData.value?.id)
      : await schemaUpdateData('board', 'inquiryChannel', { request_new_message: true }, inquiryChatData.value?.id)

    if (isCloseMessage) {
      await schemaUpdateData('board', 'inquiryChannel', { activated: false }, inquiryChatData.value?.id)

      toast.add({ title: t('message.successInquiryClosed'), color: 'success' })
      navigateTo('/inquiry')
    }

    message.value = ''
    scrollToBottom()
  }
}

const scrollToBottom = async () => {
  nextTick(() => {
    if (chatContainerRef.value) {
      chatContainerRef.value.scrollTo({
        top: chatContainerRef.value.scrollHeight,
        behavior: 'smooth',
      })
    }
  })
}

onMounted(async () => {
  await refreshInquiryChatData()
  scrollToBottom()
})
</script>

<template>
  <div
    class="relative w-full h-dvh flex flex-col gap-y-8 pt-4 pb-6 overflow-hidden pt-14"
    :class="{ 'mt-10': mobileOperationSystem === 'android' }"
  >
    <ASubPageTitle :title="$t('pageTitle.inquiry')" />
    <UCard
      :ui="{
        root: 'w-fit ring ring-neutral-400 dark:ring-neutral-600 mx-6',
        body: 'p-3 sm:p-3 break-keep',
      }"
    >
      <p
        v-for="(text, index) in $tm('inquiry.notification')"
        :key="index"
        class="text-sm break-keep"
      >
        {{ $rt(text) }}
      </p>
    </UCard>
    <div
      v-if="!pendingInquiryChatData"
      ref="chatContainerRef"
      class="w-full h-full overflow-y-scroll flex flex-col items-center gap-y-10 pt-6 pb-20"
    >
      <div
        v-for="(chatList, index) in inquiryChatData?.inquiryMessageList"
        :key="index"
        class="w-full h-fit px-6"
      >
        <InquiryMessage
          :write-user-id="chatList.update_user_id"
          :chat-message="chatList.message"
          :created-at="chatList.created_at"
        />
      </div>
    </div>
    <div
      v-else
      class="flex justify-center items-center min-h-[300px]"
    >
      <Icon
        name="i-svg-spinners-pulse-multiple"
        class="w-28 h-28"
      />
    </div>
    <UTextarea
      v-if="inquiryChatData?.activated || userData?.id === config.public.adminUid"
      v-model="message"
      class="absolute bottom-0 w-full px-6 pb-4"
      size="xl"
      :rows="1"
      autoresize
      :placeholder="$t('validate.requiredMessage')"
      @blur="onBlur"
      @keydown="handleKeydown"
      @compositionstart="composingTrigger = true"
      @compositionend="composingTrigger = false"
    >
      <template #default>
        <div class="absolute inset-y-0 end-0 h-full flex flex-col justify-start mt-1 mx-0.5 pr-6">
          <ATooltipButton
            button-variant="ghost"
            button-padding
            use-leading
            :button-disabled="!message"
            button-size="xl"
            icon-lead-name="i-lucide-send"
            icon-lead-class="h-5 w-5"
            :tooltip-text="$t('button.send')"
            @click:button="sendMessage"
          />
        </div>
      </template>
    </UTextarea>
  </div>
</template>
