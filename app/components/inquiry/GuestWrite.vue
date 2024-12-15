<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()
const { t } = useCustomLocale()

const { emailRegex } = useUi()

const { schemaUpsertData } = useUpdateComposable()

const schema = object({
  email: string()
    .required(t('validate.requiredEmail'))
    .matches(emailRegex, t('validate.formatEmail')),
  message: string()
    .required(t('validate.requiredMessage'))
    .min(100, t('validate.lengthMessage')),
})

type Schema = InferType<typeof schema>

const inquiryData = reactive({
  email: '',
  message: '',
})

const maxMemoLength = ref(2000)

const submitGuestInquiry = async (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) {
    return
  }

  const response = await schemaUpsertData('board', 'guestInquiry', inquiryData)

  if (response) {
    toast.add({ title: t('message.successLeaveGuestInquiry.title'), description: t('message.successLeaveGuestInquiry.description'), color: 'success' })
    navigateTo('/')
  }
}

const computedMemoContent = computed(() => {
  return inquiryData.message.length
})
</script>

<template>
  <div class="w-full flex flex-col items-center gap-y-10 px-6">
    <div class="w-full flex flex-col">
      <p
        v-for="(text, index) in $tm('inquiry.guestTitle')"
        :key="index"
        class="text-lg font-light break-keep"
      >
        {{ $rt(text) }}
      </p>
    </div>
    <DbForm
      :schema="schema"
      :state="inquiryData"
      class="w-full mt-2 space-y-8"
      @submit="submitGuestInquiry"
    >
      <DbFormField
        name="email"
        :label="$t('label.email')"
        required
        size="xl"
      >
        <DbInput
          v-model="inquiryData.email"
          class="w-full"
          size="xl"
          :placeholder="$t('placeholder.email')"
        />
      </DbFormField>
      <DbFormField
        name="message"
        :label="$t('label.message')"
        required
        :hint="`${computedMemoContent} / ${maxMemoLength}`"
        size="xl"
      >
        <DbTextarea
          v-model="inquiryData.message"
          class="w-full"
          autoresize
          :rows="8"
          :maxrows="10"
          :maxlength="maxMemoLength"
          variant="subtle"
          size="xl"
          :placeholder="$t('placeholder.message')"
        />
      </DbFormField>
      <DbBSeparator />
      <AButton
        button-block
        button-size="xl"
        button-type="submit"
        :button-text="$t('button.leaveInquiry')"
      />
    </DbForm>
  </div>
</template>
