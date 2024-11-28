<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const { t } = useCustomLocale()
const toast = useToast()

const { userData } = storeToRefs(useUserDataStore())

const { updateData } = useUpdateComposable()
const { loadStorage, uploadStorage } = useFetchStorageComposable()

useHead({
  title: t('pageTitle.profile'),
  meta: [{ name: 'description', content: t('pageDescription.profile') }],
})

definePageMeta({
  middleware: 'auth',
})

const limitType = ['image/jpeg', 'image/jpg', 'image/webp', 'image/png', 'image/svg+xml']

const imageInputs = ref<HTMLInputElement>()

const schema = object({
  nickname: string()
    .required(t('validate.requiredNickname')),
  avatar_url: string()
    .required(t('validate.requiredAvatar')),
})

type Schema = InferType<typeof schema>

const formData = reactive({
  nickname: '',
  avatar_url: '',
  memo: '',
})

const maxMemoLength = ref(200)

const submitUpdateProfile = async (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) {
    return
  }

  await updateData('profiles', formData, userData.value?.id)
  toast.add({ title: t('message.successSaveProfile'), color: 'success' })
  navigateTo('/')
}

const initFormData = () => {
  formData.nickname = userData.value?.nickname ?? ''
  formData.avatar_url = userData.value?.avatar_url ?? ''
  formData.memo = userData.value?.memo ?? ''
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (!limitType.includes(file.type)) {
      toast.add({ title: t('validate.imageUploadFormat'), color: 'error' })
    }
    else if (file.size / 1024 / 1024 > 5) {
      toast.add({ title: t('validate.imageUploadSize'), color: 'error' })
    }
    else {
      uploadImage(file)
    }
  }
}

const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop()
  const filePath = `${userData.value?.id.split('-').at(-1).concat('_', userData.value?.created_at.split('T').at(0))}.${fileExt}`

  await uploadStorage('avatar', filePath, file)

  toast.add({ title: t('message.successImageUpload'), color: 'success' })
  await downloadImage(filePath)
}

const downloadImage = async (filePath: string) => {
  if (!filePath) {
    return
  }

  const timestamp = new Date().getTime()
  formData.avatar_url = `${await loadStorage('avatar', filePath)}?t=${timestamp}`
}

const computedMemoContent = computed(() => {
  return formData.memo.length
})

onMounted(() => {
  initFormData()
})
</script>

<template>
  <div class="relative w-full h-[calc(100dvh-80px)] flex flex-col items-center gap-y-12 overflow-y-scroll pb-6">
    <ASubPageTitle :title="$t('pageTitle.profile')" />
    <div class="w-full max-w-[400px] px-6">
      <UCard
        :ui="{
          root: 'ring ring-neutral-400 dark:ring-neutral-600',
          body: 'p-4',
        }"
      >
        <UForm
          :schema="schema"
          :state="formData"
          class="w-full mt-2 space-y-8"
          @submit="submitUpdateProfile"
        >
          <UFormField
            name="nickname"
            :label="$t('label.nickname')"
            required
            size="xl"
          >
            <UInput
              v-model="formData.nickname"
              class="w-full"
              size="xl"
              :placeholder="$t('placeholder.nickname')"
            />
          </UFormField>
          <UFormField
            name="avatar_url"
            :label="$t('label.avatar')"
            required
            size="xl"
          >
            <NuxtImg
              v-if="formData?.avatar_url"
              class="rounded-2xl hover:ring-2 hover:ring-amber-500 transition-all duration-200 ease-in-out cursor-pointer"
              :src="formData?.avatar_url"
              :quality="60"
              preload
              width="140"
              height="140"
              alt="Avatar"
              @click="imageInputs?.click()"
            />
            <USkeleton
              v-else
              class="rounded-2xl w-[140px] h-[140px]"
            />
            <input
              ref="imageInputs"
              type="file"
              class="hidden"
              @change="handleFileChange"
            >
          </UFormField>
          <UFormField
            name="memo"
            :label="$t('label.memo')"
            size="xl"
          >
            <UTextarea
              v-model="formData.memo"
              class="w-full"
              autoresize
              :maxrows="5"
              :maxlength="maxMemoLength"
              variant="subtle"
              size="xl"
              :placeholder="$t('placeholder.memo')"
            />
            <p class="text-right text-sm text-neutral-500 mt-1">
              {{ computedMemoContent }} / {{ maxMemoLength }}
            </p>
          </UFormField>
          <USeparator />
          <AButton
            button-block
            button-size="xl"
            button-type="submit"
            :button-text="$t('button.save')"
          />
        </UForm>
      </UCard>
    </div>
  </div>
</template>
