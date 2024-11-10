<script setup lang="ts">
const { t } = useLocale()
const toast = useToast()

const { userData } = storeToRefs(useUserDataStore())
const { currencyCodeList, spendCategoryCodeList } = storeToRefs(useFilterDataStore())

const { upsertData } = useUpdateComposable()

useHead({
  title: t('pageTitle.main'),
})

const selectSpendCategoryCode = ref('')
const spendAmount = ref(0)

const saveSpendAmount = async () => {
  const payload = {
    amount: spendAmount.value,
    currency_id: currencyCodeList.value.find(item => item.code === userData.value.currency.code)?.id ?? '',
    spend_category_id: spendCategoryCodeList.value.find(item => item.code === selectSpendCategoryCode.value)?.id ?? '',
    update_user_id: userData.value.id ?? '',
  }

  const response = await upsertData('spendList', payload)

  if (response) {
    /**
     * ? 추후에 저장 데이터 리스트 새로고침 기능 추가해야 함 ?
     */

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
  <div class="w-full h-[calc(100dvh-80px)] pb-2">
    <div
      v-if="userData"
      class="h-full overflow-y-scroll flex flex-col gap-y-8 px-5 py-4"
    >
      <MainSetOption
        :target-amount="userData.weekly_target_amount"
        :currency-code="userData.currency.code"
        :end-date-code="userData.endDate.code"
      />
      <MainArithmometerGroup
        v-model:main-spend-category-code="selectSpendCategoryCode"
        v-model:main-spend-amount="spendAmount"
        :currency-code="userData.currency.code"
        :target-amount="userData.weekly_target_amount"
        @save:spend-amount="saveSpendAmount"
      />
      <AFooter />
    </div>
    <div v-else>
      <p class="text-center text-sm">
        언녕하세요!
      </p>
      <p class="text-center text-sm">
        매주 소비목표 달성도 체크를 함께해요!
      </p>
      <p class="text-center text-sm">
        로그인 후 사용 가능해요!
      </p>
    </div>
  </div>
</template>
