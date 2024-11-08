<script setup lang="ts">
import type { FilterDatabase } from '@/types/supabaseFilter'

const { t } = useLocale()

const { userData } = storeToRefs(useUserDataStore())
const { currencyCodeList, startDateCodeList } = storeToRefs(useFilterDataStore())

const { excuteUserData } = useLoadUserData()
const { updateData } = useUpdateComposable()

useHead({
  title: t('pageTitle.settings'),
})

definePageMeta({
  middleware: 'auth',
})

const currentCurrency = ref(userData.value?.currency?.code)
const currentStartDate = ref(userData.value?.startDate?.code)

const clickCurrencyButton = async (currencyCode: string) => {
  currentCurrency.value = currencyCode
  const currencyId = currencyCodeList.value.find((currency: FilterDatabase['filter']['Tables']['currency']['Row']) => currency.code === currencyCode)?.id

  await updateData('profiles', { currency_id: currencyId }, userData.value?.id)
  excuteUserData()
}

const clickStartDateButton = async (startDateCode: string) => {
  currentStartDate.value = startDateCode
  const startDateId = startDateCodeList.value.find((startDate: FilterDatabase['filter']['Tables']['startDate']['Row']) => startDate.code === startDateCode)?.id

  await updateData('profiles', { start_date_id: startDateId }, userData.value?.id)
  excuteUserData()
}
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-y-8">
    <ASubPageTitle :title="$t('pageTitle.settings')" />
    <SettingCurrency
      :current-currency="currentCurrency"
      @click:currency="clickCurrencyButton"
    />
    <SettingStartDate
      :current-start-date="currentStartDate"
      @click:start-date="clickStartDateButton"
    />
  </div>
</template>
