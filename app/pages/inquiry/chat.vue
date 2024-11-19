<script setup lang="ts">
const { t } = useLocale()

// const { fetchRangeData } = useFetchComposable()

const user = useSupabaseUser()

useHead({
  title: t('pageTitle.inquiry'),
})

// const { data: inquiryChannelList, pending: pendingInquiryChannelList } = useAsyncData(async () => {
//   const { data } = await fetchRangeData('viewDailyResultList', '*', 'created_at', '2024-11-16 15:00:00', 'created_at', '2024-11-10 15:00:00')

//   return data
//     ? data
//     : []
// }, {
//   immediate: true,
// })

// console.log(inquiryChannelList.value)
const clickInquiryButton = () => {
  if (user.value?.id) {
    // 문의 채팅생성
  }
  else {
    navigateTo('/inquiry/guest')
  }
}
</script>

<template>
  <div class="relative w-full h-fit flex flex-col justify-center gap-y-8 py-4 pb-6">
    <ASubPageTitle :title="$t('pageTitle.inquiry')" />
    <div class="w-full flex flex-col items-center gap-y-10 px-6">
      <div class="w-full flex justify-end">
        <AButton
          button-size="xl"
          button-variant="subtle"
          :button-text="'문의하기'"
          @click="clickInquiryButton"
        />
      </div>
      <USeparator />
      <div v-if="user?.id">
        문의 리스트
        페이지 네이션 넣기
      </div>
      <div v-else>
        로그인 안되어있을 때의 문의 하기
      </div>
    </div>
  </div>
</template>
