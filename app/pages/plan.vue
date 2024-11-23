<script setup lang="ts">
// import { loadScript } from '@paypal/paypal-js'

const user = useSupabaseUser()

// const config = useRuntimeConfig()
const { t } = useCustomLocale()

useHead({
  title: t('pageTitle.plan'),
})

// const paypal = ref()

const loginModalTrigger = ref(false)

const moveToLogin = () => {
  loginModalTrigger.value = false
  navigateTo('/login')
}

if (!user.value) {
  loginModalTrigger.value = true
}

const clickPlan = async (option: string) => {
  if (option === 'free') {
    return
  }

  // console.log(option)
}

// const loadPaypalScript = async () => {
//   try {
//     paypal.value = await loadScript({
//       clientId: config.public.paypalClientId,
//       currency: 'USD',
//       components: ['buttons', 'marks', 'messages'],
//     })

//     renderPaypalButton()
//   }
//   catch (error) {
//     console.error('failed to load the PayPal JS SDK script', error)
//   }
// }

// const renderPaypalButton = () => {
//   if (!paypal.value) return

//   paypal.value.Buttons({
//     message: {
//       amount: 1,
//       align: 'center',
//       position: 'top',
//     },
//     style: {
//       layout: 'vertical',
//       color: 'blue',
//       borderRadius: 8,
//     },
//   }).render('#paypal-button-container')
// }

// await loadPaypalScript()
</script>

<template>
  <div class="relative w-full h-fit flex flex-col justify-center gap-y-8 py-4 pb-6">
    <ASubPageTitle :title="$t('pageTitle.plan')" />
    <div class="w-full flex flex-col items-center gap-y-10 px-6">
      <p class="w-full text-lg font-light break-keep">
        [안내]: 아직은 무료 서비스만 이용 가능해요!<br>
        요금제 변경은 추후 추가 예정이에요후
      </p>
      <PlanList
        clickable
        @click:plan="clickPlan"
      />
      <!-- <div
        id="paypal-button-container"
        class="w-full h-fit"
      /> -->
    </div>
    <ModalConfirm
      v-model:confirm-modal-trigger="loginModalTrigger"
      :title="$t('modal.confirmLogin.title')"
      :description="$t('modal.confirmLogin.description')"
      prevent-close
      :use-close="false"
      @click:comfirm="moveToLogin"
      @click:cancel="navigateTo('/')"
    />
  </div>
</template>
