<script setup lang="ts">
const { t } = useLocale()
const toast = useToast()

const config = useRuntimeConfig()
const { query } = useRoute()

const channelCode = query.channelCode as string

const { schemaFetchOptionSingleData } = useFetchComposable()
const { schemaUpsertData, schemaUpdateData } = useUpdateComposable()

const { userData } = storeToRefs(useUserDataStore())

useHead({
  title: t('pageTitle.inquiry'),
})

definePageMeta({
  middleware: 'auth',
})

const chatContainerRef = ref<HTMLElement | null>(null)

const userType = ref('')
const message = ref('')
const composingTrigger = ref(false)

const { data: inquiryChatData, refresh: refreshInquiryChatData } = useAsyncData('inquiryChatData', async () => {
  const response = await schemaFetchOptionSingleData('board', 'viewInquiryChannel', '*', 'channel_code', channelCode)

  if (response) {
    enterInquiryChat(response.id, response.request_user_id)
  }

  return response
    ? response
    : null
}, {
  immediate: true,
})

const enterInquiryChat = async (inquiryChannelId: string, requestUserId: string) => {
  const isAdmin = userData.value?.id !== requestUserId

  const updateData = {
    userType: isAdmin ? 'admin' : 'request',
    messageField: isAdmin ? 'admin_new_message' : 'request_new_message',
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
  <div class="relative w-full h-full flex flex-col gap-y-8 overflow-hidden">
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
      ref="chatContainerRef"
      class="w-full h-fit overflow-y-scroll flex flex-col items-center gap-y-10 py-4 pb-20"
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
