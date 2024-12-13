<script setup lang="ts">
import { domToWebp, domToPng } from 'modern-screenshot'

const { isMobileOrTablet, isSafari, isChrome, isAndroid, userAgent } = useDevice()

const { t } = useCustomLocale()
const { url } = useImageStorage()

const { userData } = storeToRefs(useUserDataStore())
const { mobileOperationSystem } = storeToRefs(useWindowStore())

const { loadStorage, uploadStorage } = useFetchStorageComposable()

useHead({
  title: t('pageTitle.share'),
  meta: [{ name: 'description', content: t('pageDescription.share') }],
})

definePageMeta({
  middleware: 'auth',
})

const shareCard = ref()

const shareImageUrl = ref('')
const shareImageModalTrigger = ref(false)
const isShareDevice = computed(() => {
  return userAgent.includes('APP_Dewbee') || userAgent.includes('APP_AOS_DewBee') || (isMobileOrTablet && isSafari) || isAndroid
})

const transformSpendListData = (dailyResultData: DailyResult[]) => {
  const chartDateLabel = ref<string[]>([])
  const chartValuesUnit = ref<string[]>([])

  const chartKrwValues = ref<number[]>([])
  const chartUsdValues = ref<number[]>([])
  const chartJpyValues = ref<number[]>([])

  const summaryKrwAmount = ref<number>(0)
  const summaryUsdAmount = ref<number>(0)
  const summaryJpyAmount = ref<number>(0)

  dailyResultData.forEach((item: DailyResult) => {
    switch (item.currency.code) {
      case 'CYC001':
        chartKrwValues.value.unshift(item.summary_amount ?? 0)
        summaryKrwAmount.value += item.summary_amount ?? 0
        chartUsdValues.value.unshift(0)
        chartJpyValues.value.unshift(0)
        break
      case 'CYC002':
        chartUsdValues.value.unshift(item.summary_amount ?? 0)
        summaryUsdAmount.value += item.summary_amount ?? 0
        chartKrwValues.value.unshift(0)
        chartJpyValues.value.unshift(0)
        break
      case 'CYC003':
        chartJpyValues.value.unshift(item.summary_amount ?? 0)
        summaryJpyAmount.value += item.summary_amount ?? 0
        chartKrwValues.value.unshift(0)
        chartUsdValues.value.unshift(0)
        break
    }

    chartDateLabel.value.unshift(item.created_at ?? '')
    chartValuesUnit.value.unshift(item.currency.code ?? '')
  })

  return { chartDateLabel, chartKrwValues, chartUsdValues, chartJpyValues, chartValuesUnit, summaryKrwAmount, summaryUsdAmount, summaryJpyAmount }
}

const summarySpendCategory = (spendListData: Realtime[]) => {
  const categoryCodes = [
    'SCC001', 'SCC002', 'SCC003', 'SCC004', 'SCC005', 'SCC006',
    'SCC007', 'SCC008', 'SCC009', 'SCC010', 'SCC011', 'SCC012',
  ]

  const categoryCount = ref(
    categoryCodes.reduce((acc, code) => {
      acc[code] = 0
      return acc
    }, {} as Record<string, number>),
  )

  spendListData.forEach((item: Realtime) => {
    const key = item.spendCategory.code
    if (categoryCount.value[key] !== undefined) {
      categoryCount.value[key] += 1
    }
  })

  return Object.entries(categoryCount.value).map(([key, value]) => ({
    code: key,
    value: value,
  }))
}

const { data: recentRecordWeeklyData, execute: _executeRecentRecordWeeklyData, pending: pendingRecentRecordWeeklyData } = await useAsyncData('recentRecordWeeklyData', async () => {
  const { data }: SerializeObject = await useFetch('/api/shares/', {
    query: {
      weeklyTableName: 'viewWeeklyResultList',
      dailyTableName: 'viewDailyResultList',
      spendListTableName: 'viewSpendList',
    },
    headers: useRequestHeaders(['cookie']),
    transform: (payload: SerializeObject) => {
      if (payload) {
        const statistics = transformSpendListData(payload.dailyResultData)
        const categoryCount = summarySpendCategory(payload.spendListData)

        return {
          statistics,
          categoryCount,
          created_at: payload.created_at,
        }
      }
    },
  })

  return data.value
}, {
  dedupe: 'defer',
  deep: true,
})

const saveImage = async () => {
  if (isShareDevice.value) {
    let imageUrl = ''
    const maxAttempts = (isSafari || isChrome) ? 5 : 1

    for (let i = 0; i < maxAttempts; i++) {
      await domToPng(shareCard.value, {
        backgroundColor: '#ffffff00',
      }).then((dataUrl: string) => {
        imageUrl = dataUrl
      })
    }

    uploadAndDownloadImage(imageUrl)
  }
  else {
    domToWebp(shareCard.value, {
      backgroundColor: '#ffffff00',
    }).then((dataUrl: string) => {
      const link = document.createElement('a')
      link.download = `${userData.value.nickname}.webp`
      link.href = dataUrl
      link.click()
      link.remove()
    })
  }
}

const uploadAndDownloadImage = async (base64Data: string) => {
  if (!base64Data) return new Blob([], { type: 'image/png' })

  const base64ContentArray = base64Data.split(',')
  const base64String = base64ContentArray[1] ?? ''
  const mimeType = base64ContentArray[0]?.match(/:(.*?);/)?.[1] ?? 'image/webp'

  const byteCharacters = atob(base64String)
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i))
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType })

  const fileName = userData.value?.id.split('-').at(-1).concat('_', recentRecordWeeklyData.value.created_at.split('T').at(0), '.png')

  await uploadStorage('share', fileName, blob, 'Blob')

  const imageUrl = await loadStorage('share', fileName)

  shareImageUrl.value = imageUrl
  shareImageModalTrigger.value = true
}

const getSummaryAmount = (currencyCode: string) => {
  switch (currencyCode) {
    case 'CYC001':
      return recentRecordWeeklyData.value.statistics.summaryKrwAmount
    case 'CYC002':
      return recentRecordWeeklyData.value.statistics.summaryUsdAmount
    case 'CYC003':
      return recentRecordWeeklyData.value.statistics.summaryJpyAmount
    default:
      return 0
  }
}
</script>

<template>
  <div
    class="relative w-full h-fit flex flex-col justify-center gap-y-8 pt-4 pb-6"
    :class="{ 'mt-10': mobileOperationSystem === 'android' }"
  >
    <ASubPageTitle
      :title="$t('pageTitle.share')"
      title-class="text-2xl font-semibold"
      avatar-size="md"
    />
    <div
      v-if="recentRecordWeeklyData && !pendingRecentRecordWeeklyData"
      class="h-fit flex flex-col items-center gap-y-6 mt-10 px-6"
    >
      <div class="w-full flex flex-col items-end gap-y-4">
        <p
          v-if="!isShareDevice"
          class="text-lg sm:text-xl text-right break-keep"
        >
          {{ $t('share.result.downloadDescription') }}
        </p>
        <AButton
          custom-class="w-fit"
          button-size="xl"
          button-variant="subtle"
          :button-text="isShareDevice ? $t('button.imageShare') : $t('button.imageSave')"
          @click="saveImage"
        />
      </div>
      <div
        ref="shareCard"
        class="w-full"
      >
        <UCard
          :ui="{
            root: 'ring-animate w-full border-4 ring-0 rounded-xl bg-gradient-to-br from-amber-600/20 from-10% via-neutral-100/20 via-30% to-amber-300/20 to-90%',
            header: 'w-full',
            body: 'bg-stone-50/70 dark:bg-stone-950/50 m-4 rounded-xl',
          }"
        >
          <div class="flex flex-col gap-y-5">
            <div class="flex flex-col sm:flex-row justify-between">
              <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                <UAvatarGroup size="xl">
                  <UAvatar
                    :src="url(true, '/assets/dewbee_logo.webp')"
                    size="xl"
                    format="webp"
                    alt="DewBee Logo"
                    :ui="{
                      root: 'ring-3 ring-amber-400/40',
                    }"
                  />
                  <UAvatar
                    :src="userData.avatar_url"
                    size="xl"
                    :alt="userData.nickname"
                    :ui="{
                      root: 'ring-3 ring-amber-400/40',
                    }"
                  />
                </UAvatarGroup>
                <span class="text-md sm:text-xl font-bold break-keep">
                  {{ $t('share.title', { nickname: userData.nickname }) }}
                </span>
              </div>
              <RecordsSuccessResult
                v-for="currency in ['CYC001', 'CYC002', 'CYC003']"
                :key="currency"
                :currency-code="currency"
                :summary-amount="getSummaryAmount(currency)"
                :target-amount="userData.weekly_target_amount"
              />
            </div>
            <USeparator color="primary" />
            <RecordsSpendCategory
              :category-count="recentRecordWeeklyData.categoryCount"
              :statistics="recentRecordWeeklyData.statistics"
            />
          </div>
        </UCard>
      </div>
    </div>
    <div
      v-else
      class="h-fit flex flex-col items-center mt-10 px-6"
    >
      <UCard
        :ui="{
          root: 'w-full h-40 ring ring-neutral-400 dark:ring-neutral-600',
          body: 'h-full flex items-center justify-center break-keep',
        }"
      >
        {{ $t('share.noShare') }}
      </UCard>
    </div>
    <ModalShareImage
      v-model:share-image-modal-trigger="shareImageModalTrigger"
      v-model:share-image-url="shareImageUrl"
      fullscreen
      :title="$t('share.result.title')"
      :description="$t('share.result.description')"
    >
      <div class="w-full h-full flex justify-center items-center px-6">
        <img
          :src="shareImageUrl"
          class="w-full h-auto"
          alt="share image"
        >
      </div>
    </ModalShareImage>
  </div>
</template>

<style lang="scss" scoped>
@keyframes ringColorChange {
  0%, 100% {
    border-color: #f59f0bd1; /* amber-500 */
  }
  50% {
    border-color: #c37f09c9; /* amber-200 */
  }
}

.ring-animate {
  animation: ringColorChange 2s infinite;
}
</style>
