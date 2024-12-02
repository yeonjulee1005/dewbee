<script setup lang="ts">
const { t } = useCustomLocale()
const toast = useToast()

const { userData } = storeToRefs(useUserDataStore())

const { updateData, upsertData } = useUpdateComposable()
const { fetchOptionData, logout } = useFetchComposable()

const withdrawalConfirmTrigger = ref(false)

const withdrawalProcess = async () => {
  deleteSpendList()
  deleteDailyResultList()
  deleteWeeklyResultList()

  await updateData('profiles', { deleted: true }, userData.value?.id)

  toast.add({ title: t('message.successWithdrawal.title'), description: t('message.successWithdrawal.description'), color: 'success' })
  await logout()
}

const deleteSpendList = async () => {
  const response = await fetchOptionData('spendList', '*', 'update_user_id', userData.value?.id) as unknown as Database['public']['Tables']['spendList']['Row'][]

  const payload = response?.map((spend) => {
    return {
      id: spend.id,
      deleted: true,
    }
  })

  await upsertData('spendList', payload)
}

const deleteDailyResultList = async () => {
  const response = await fetchOptionData('dailyResultList', '*', 'update_user_id', userData.value?.id) as unknown as Database['public']['Tables']['dailyResultList']['Row'][]

  const payload = response?.map((dailyResult) => {
    return {
      id: dailyResult.id,
      deleted: true,
    }
  })

  await upsertData('dailyResultList', payload)
}

const deleteWeeklyResultList = async () => {
  const response = await fetchOptionData('weeklyResultList', '*', 'update_user_id', userData.value?.id) as unknown as Database['public']['Tables']['weeklyResultList']['Row'][]

  const payload = response?.map((weeklyResult) => {
    return {
      id: weeklyResult.id,
      deleted: true,
    }
  })

  await upsertData('weeklyResultList', payload)
}
</script>

<template>
  <div>
    <AButton
      button-variant="ghost"
      button-color="neutral"
      button-size="md"
      :button-text="$t('button.withdrawal')"
      @click="withdrawalConfirmTrigger = true"
    />
  </div>
  <ModalConfirm
    v-model:confirm-modal-trigger="withdrawalConfirmTrigger"
    prevent-close
    :title="$t('modal.confirmWithdrawal.title')"
    :description="$t('modal.confirmWithdrawal.description')"
    :ui="{
      body: 'hidden',
    }"
    @click:comfirm="withdrawalProcess"
  />
</template>
