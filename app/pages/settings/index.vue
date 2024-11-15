<script setup lang="ts">
import type { FilterDatabase } from '@/types/supabaseFilter'

const { t } = useLocale()

const { userData } = storeToRefs(useUserDataStore())
const { currencyCodeList, endDateCodeList } = storeToRefs(useFilterDataStore())

const { executeUpdateData } = useLoadUserData()
const { updateData } = useUpdateComposable()

useHead({
  title: t('pageTitle.settings'),
})

definePageMeta({
  middleware: 'auth',
})

const currentTargetAmount = ref(userData.value?.weekly_target_amount)
const currentCurrency = ref(userData.value?.currency?.code)
const currentEndDate = ref(userData.value?.endDate?.code)

const updateTargetAmount = async () => {
  if (currentTargetAmount.value === 0) {
    return
  }

  await updateProfileData({ weekly_target_amount: currentTargetAmount.value })
}

const clickCurrencyButton = async (currencyCode: string) => {
  currentCurrency.value = currencyCode
  const currencyId = currencyCodeList.value.find((currency: FilterDatabase['filter']['Tables']['currency']['Row']) => currency.code === currencyCode)?.id

  await updateProfileData({ currency_id: currencyId })
}

const clickEndDateButton = async (endDateCode: string) => {
  currentEndDate.value = endDateCode
  const endDateId = endDateCodeList.value.find((endDate: FilterDatabase['filter']['Tables']['endDate']['Row']) => endDate.code === endDateCode)?.id

  await updateProfileData({ end_date_id: endDateId })
}

const updateProfileData = async (payload: Database['public']['Tables']['profiles']['Update']) => {
  await updateData('profiles', payload, userData.value?.id)
  executeUpdateData()
}
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-y-8">
    <ASubPageTitle :title="$t('pageTitle.settings')" />
    <SettingCurrency
      :current-currency="currentCurrency"
      @click:currency="clickCurrencyButton"
    />
    <SettingTargetAmount
      v-model:target-amount="currentTargetAmount"
      :current-currency="currentCurrency"
      @click:save="updateTargetAmount"
    />
    <SettingEndDate
      :current-end-date="currentEndDate"
      @click:end-date="clickEndDateButton"
    />
    <ULink
      class="w-full text-right px-6"
      to="/policy"
      target="_blank"
    >
      {{ $t('menu.policy') }}
    </ULink>
  </div>
</template>
