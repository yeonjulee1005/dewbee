<script setup lang="ts">
const config = useRuntimeConfig()

const { fullPath } = useRoute()
const { t } = useLocale()
const toast = useToast()

const { comma } = useUi()
const { getWeeklyTimestampz } = useLocalTimezone()

const { userData } = storeToRefs(useUserDataStore())
const { pendingUpdateData } = useLoadUserData()
const { currencyCodeList, spendCategoryCodeList } = storeToRefs(useFilterDataStore())

const { fetchRangeData } = useFetchComposable()
const { upsertData } = useUpdateComposable()

useCookie(`${config.public.supabase.cookieName}-redirect-path`).value = fullPath

useHead({
  title: t('pageTitle.main'),
})

const selectSpendCategoryCode = ref('')
const spendAmount = ref(0)
const saveConfirmTrigger = ref(false)

const { data: spendListData, execute: executeSpendListData } = useAsyncData(async () => {
  if (!userData.value) {
    return { data: [], count: 0 }
  }

  const startDateTimestampz = getWeeklyTimestampz(userData.value.endDate.code)?.gteDate ?? ''
  const endDateTimestampz = getWeeklyTimestampz(userData.value.endDate.code)?.lteDate ?? ''

  const response = await fetchRangeData('viewSpendList', '*', 'created_at', endDateTimestampz, 'created_at', startDateTimestampz, 'update_user_id', userData.value.id)

  return response
    ? response
    : { data: [], count: 0 }
}, {
  immediate: true,
})

const computedLoginState = computed(() => userData.value)

const computedSpendSituation = computed(() => {
  let amount = 0
  let color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'secondary'
  let label = ''
  let icon = 'i-lucide-check-circle'

  if (!spendListData.value) {
    return { color, label: t('main.situation.excellent'), icon }
  }

  spendListData.value?.data.forEach((item: Database['public']['Views']['viewSpendList']['Row']) => {
    amount += item.amount ?? 0
  })

  const targetAmount = userData.value?.weekly_target_amount
  const percentage = (amount / targetAmount) * 100

  if (percentage <= 25) {
    color = 'secondary'
    label = t('main.situation.excellent')
    icon = 'i-fluent-emoji-high-contrast-grinning-squinting-face'
  }
  else if (percentage <= 50) {
    color = 'success'
    label = t('main.situation.good')
    icon = 'i-fluent-emoji-high-contrast-kissing-face-with-closed-eyes'
  }
  else if (percentage <= 75) {
    color = 'warning'
    label = t('main.situation.warning')
    icon = 'i-fluent-emoji-high-contrast-grinning-face-with-sweat'
  }
  else {
    color = 'error'
    label = t('main.situation.danger')
    icon = 'i-fluent-emoji-high-contrast-crying-face'
  }

  return { color, label, icon }
})

const saveSpendAmount = async () => {
  spendAmount.value > userData.value?.weekly_target_amount
    ? saveConfirmTrigger.value = true
    : saveProcess()
}

const saveProcess = async () => {
  const payload = {
    amount: spendAmount.value,
    currency_id: currencyCodeList.value.find(item => item.code === userData.value.currency.code)?.id ?? '',
    spend_category_id: spendCategoryCodeList.value.find(item => item.code === selectSpendCategoryCode.value)?.id ?? '',
    update_user_id: userData.value.id ?? '',
  }

  const response = await upsertData('spendList', payload)

  if (response) {
    executeSpendListData()

    toast.add({ title: t('message.successSpendAmountSave'), color: 'success' })
    clearArithmometer()
  }
}

const clearArithmometer = () => {
  spendAmount.value = 0
  selectSpendCategoryCode.value = ''
}
</script>

<template>
  <div
    v-if="!pendingUpdateData"
    class="w-full h-fit pb-2"
  >
    <div
      v-if="computedLoginState"
      class="h-fit flex flex-col items-end gap-y-8 px-6 py-4"
    >
      <MainSetOption
        v-model:situation="computedSpendSituation"
        :spend-count="spendListData?.count ?? 0"
        :target-amount="userData?.weekly_target_amount"
        :currency-code="userData?.currency.code"
        :end-date-code="userData?.endDate.code"
      />
      <MainArithmometerGroup
        v-model:main-spend-category-code="selectSpendCategoryCode"
        v-model:main-spend-amount="spendAmount"
        :currency-code="userData?.currency.code"
        :target-amount="userData?.weekly_target_amount"
        @save:spend-amount="saveSpendAmount"
      />
      <AFooter />
    </div>
    <div
      v-else
      class="h-fit flex flex-col gap-y-6 px-6 py-4"
    >
      <div class="flex flex-col gap-y-10">
        <MainIntroTitle />
        <MainIntroLogin />
        <MainIntroDescriptions />
        <MainIntroPlan />
      </div>
      <AFooter />
    </div>
    <ModalConfirm
      v-model:confirm-modal-trigger="saveConfirmTrigger"
      :title="$t('modal.confirmSaveSpend.title')"
      :description="$t('modal.confirmSaveSpend.description')"
      @click:comfirm="saveProcess"
    >
      <p class="text-right text-lg font-light">
        {{ $t('modal.confirmSaveSpend.exceedAmount', { amount: comma(spendAmount - userData?.weekly_target_amount), currency: $t(`currency.${userData?.currency.code}`) }) }}
      </p>
    </ModalConfirm>
  </div>
  <div
    v-else
    class="flex justify-center items-center h-screen"
  >
    <Icon
      name="i-svg-spinners-pulse-multiple"
      class="w-28 h-28"
    />
  </div>
</template>
