<script setup lang="ts">
import type { FilterDatabase } from '@/types/supabaseFilter'

const { t } = useCustomLocale()
const toast = useToast()

const { windowSize } = storeToRefs(useWindowStore())
const { userData } = storeToRefs(useUserDataStore())
const { currencyCodeList, endDateCodeList } = storeToRefs(useFilterDataStore())

const { executeUpdateData } = useLoadUserData()
const { updateData } = useUpdateComposable()

useHead({
  title: t('pageTitle.settings'),
  meta: [{ name: 'description', content: t('pageDescription.settings') }],
})

definePageMeta({
  middleware: 'auth',
})

const currentTargetAmount = ref(userData.value?.weekly_target_amount)
const currentCurrency = ref(userData.value?.currency?.code)
const currentEndDate = ref(userData.value?.endDate?.code)
const currentLocalTimezoneId = ref(userData.value?.local_timezone_id)

const updateTargetAmount = async () => {
  if (currentTargetAmount.value === 0) {
    return
  }

  await updateProfileData({ weekly_target_amount: currentTargetAmount.value }, 'targetAmount')
}

const clickCurrencyButton = async () => {
  const currencyId = currencyCodeList.value.find((currency: FilterDatabase['filter']['Tables']['currency']['Row']) => currency.code === currentCurrency.value)?.id

  await updateProfileData({ currency_id: currencyId }, 'currency')
}

const clickEndDateButton = async () => {
  const endDateId = endDateCodeList.value.find((endDate: FilterDatabase['filter']['Tables']['endDate']['Row']) => endDate.code === currentEndDate.value)?.id

  await updateProfileData({ end_date_id: endDateId }, 'endDate')
}

const updateTimezone = async () => {
  await updateProfileData({ local_timezone_id: currentLocalTimezoneId.value }, 'localTimezone')
}

const updateProfileData = async (payload: Database['public']['Tables']['profiles']['Update'], category: 'targetAmount' | 'currency' | 'endDate' | 'localTimezone') => {
  await updateData('profiles', payload, userData.value?.id)
  executeUpdateData()

  const settingCategoryText = t(`settings.title.${category}`, { currency: t(`text.${currentCurrency.value}`) ?? '' })

  toast.add({ title: t('message.successSaveSettings.title'), description: t('message.successSaveSettings.description', { setting: settingCategoryText }), color: 'success' })
}
</script>

<template>
  <div class="relative h-fit flex flex-col justify-center items-center gap-y-8 pb-6">
    <ASubPageTitle :title="$t('pageTitle.settings')" />
    <SettingCurrency
      v-model:current-currency="currentCurrency"
      :window-width="windowSize"
      @click:currency-save="clickCurrencyButton"
    />
    <SettingTargetAmount
      v-model:target-amount="currentTargetAmount"
      :current-currency="currentCurrency"
      @click:save="updateTargetAmount"
    />
    <SettingEndDate
      v-model:current-end-date="currentEndDate"
      :window-width="windowSize"
      @click:save="clickEndDateButton"
    />
    <SettingLocalTimezone
      v-model:current-local-timezone-id="currentLocalTimezoneId"
      :window-width="windowSize"
      @click:save="updateTimezone"
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
