<script setup lang="ts">
const config = useRuntimeConfig()

const user = useSupabaseUser()

const { fullPath } = useRoute()
const { t } = useCustomLocale()
const toast = useToast()

const { comma } = useUi()
const { getWeeklyTimestampz } = useLocalTimezone()

const { mobileOperationSystem } = storeToRefs(useWindowStore())
const { userData } = storeToRefs(useUserDataStore())
const { pendingUpdateData, executeUpdateData } = useLoadUserData()
const { currencyCodeList, spendCategoryCodeList } = storeToRefs(useFilterDataStore())

const { fetchRangeData } = useFetchComposable()
const { upsertData } = useUpdateComposable()

useCookie(`${config.public.supabase.cookieName}-redirect-path`).value = fullPath

useHead({
  title: t('pageTitle.main'),
})

if (user.value?.id && !userData.value) {
  executeUpdateData()
}

const selectSpendCategoryCode = ref('')
const spendAmount = ref(0)
const saveConfirmTrigger = ref(false)

const { data: mainSpendList, execute: executeSpendListData } = await useAsyncData('mainSpendList', async () => {
  if (!userData.value) {
    return { data: [], count: 0 }
  }

  const startDateTimestampz = getWeeklyTimestampz(userData.value.endDate.code)?.gteDate ?? ''
  const endDateTimestampz = getWeeklyTimestampz(userData.value.endDate.code)?.lteDate ?? ''

  const response = await fetchRangeData('viewSpendList', '*', 'created_at', endDateTimestampz, 'created_at', startDateTimestampz, true, 'update_user_id', userData.value.id)

  return response
    ? response
    : { data: [], count: 0 }
}, {
  dedupe: 'defer',
  immediate: true,
})

const { data: mainWeeklyResultList, pending: pendingMainWeeklyResultList } = await useAsyncData('mainWeeklyResultList', async () => {
  const { data }: SerializeObject = await useFetch('/api/pagination', {
    query: {
      tableName: 'viewWeeklyResultList',
      startPage: 0,
      endPage: 3,
    },
    headers: useRequestHeaders(['cookie']),
  })

  return data.value && data.value.data && data.value.count
    ? data.value.data
    : []
}, {
  dedupe: 'defer',
  immediate: true,
})

const saveSpendAmount = async () => {
  spendAmount.value > userData.value?.weekly_target_amount
    ? saveConfirmTrigger.value = true
    : saveProcess()
}

const saveProcess = async () => {
  const payload = {
    amount: spendAmount.value,
    currency_id: currencyCodeList.value.find(item => item.code === userData.value?.currency.code)?.id ?? '',
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
      v-if="user?.id"
      class="h-fit flex flex-col items-start gap-y-8 px-6 py-4"
      :class="{ 'mt-10': mobileOperationSystem === 'android' }"
    >
      <Suspense>
        <LazyMainSetOption
          :spend-list="mainSpendList?.data ?? []"
          :spend-count="mainSpendList?.count ?? 0"
          @execute:spend-list="executeSpendListData"
        />
      </Suspense>
      <LazyMainSuccessTable
        :table-data="mainWeeklyResultList"
        :pending-table-data="pendingMainWeeklyResultList"
      />
      <MainArithmometerGroup
        v-model:main-spend-category-code="selectSpendCategoryCode"
        v-model:main-spend-amount="spendAmount"
        :weekly-result-list="mainWeeklyResultList"
        :pending-weekly-result-list="pendingMainWeeklyResultList"
        :currency-code="userData?.currency?.code"
        :target-amount="userData?.weekly_target_amount"
        @save:spend-amount="saveSpendAmount"
      />
      <AFooter />
    </div>
    <div
      v-else
      class="h-fit flex flex-col gap-y-6 px-6 py-4"
      :class="{ 'mt-12': mobileOperationSystem === 'android' }"
    >
      <MainIntroTitle />
      <MainIntroDescriptions />
      <AFooter />
    </div>
    <ModalConfirm
      v-model:confirm-modal-trigger="saveConfirmTrigger"
      :title="$t('modal.confirmSaveSpend.title')"
      :description="$t('modal.confirmSaveSpend.description')"
      @click:comfirm="saveProcess"
    >
      <p class="text-right text-lg font-light">
        {{ $t('modal.confirmSaveSpend.exceedAmount', { amount: comma(spendAmount - userData?.weekly_target_amount), currency: $t(`currency.${userData?.currency?.code}`) }) }}
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
