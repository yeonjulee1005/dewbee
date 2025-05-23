<script setup lang="ts">
import type { BoardDatabase } from '@/types/supabaseBoard'

const { windowSize } = storeToRefs(useWindowStore())

type MemberInquiry = BoardDatabase['board']['Views']['viewInquiryChannel']['Row']
  & { adminProfiles: Database['public']['Views']['viewProfiles']['Row'] }
  & { requestUserProfiles: Database['public']['Views']['viewProfiles']['Row'] }

const props = withDefaults(defineProps<{
  listType?: 'adminGuest' | 'adminMember' | 'member' | undefined
  listPending?: boolean
  listData?: {
    list: BoardDatabase['board']['Tables']['guestInquiry']['Row'] [] | MemberInquiry[]
    count: number
  }
  pageSize?: number
}>(), {
  listType: undefined,
  listPending: false,
  listData: () => ({ list: [], count: 0 }),
  pageSize: 5,
})

const emit = defineEmits([
  'reply:admin-guest',
  'move:chat-member',
  'move:chat-admin',
])

const listCurrentPage = defineModel('listCurrentPage', {
  type: Number,
  default: 1,
})

const clickList = (list: any) => {
  switch (props.listType) {
    case 'adminGuest':
      emit('reply:admin-guest', list)
      break
    case 'adminMember':
      emit('move:chat-admin', list)
      break
    case 'member':
      emit('move:chat-member', list)
      break
  }
}
</script>

<template>
  <div class="w-full flex flex-col items-center gap-y-2">
    <div
      v-if="!listPending"
      class="w-full flex flex-col gap-y-6"
    >
      <p
        v-if="listData?.list.length === 0"
        class="w-full text-center text-lg font-light text-neutral-500 dark:text-neutral-400 mb-4"
      >
        {{ $t('placeholder.noInquiry') }}
      </p>
      <DbCard
        v-for="(list, index) in listData?.list"
        :key="index"
        :ui="{
          root: `${!(list as MemberInquiry).activated ? 'opacity-70' : 'ring-neutral-400 dark:ring-neutral-600 hover:ring-2 hover:ring-sky-400 dark:hover:ring-sky-600 transition-all duration-200 ease-in-out'} cursor-pointer ring`,
          body: 'flex flex-col gap-y-2 p-4',
        }"
        @click="clickList(list)"
      >
        <div
          v-if="listType === 'adminGuest'"
          class="w-full flex flex-col gap-y-2"
        >
          <p class="text-lg font-semibold">
            {{ $t('inquiry.label.email', { email: (list as BoardDatabase['board']['Tables']['guestInquiry']['Row'])?.email }) }}
          </p>
          <p class="w-full text-sm font-light text-neutral-500 dark:text-neutral-400 break-words">
            {{ (list as BoardDatabase['board']['Tables']['guestInquiry']['Row'])?.message }}
          </p>
        </div>
        <div
          v-if="listType !== 'adminGuest'"
          class="w-full flex justify-between"
        >
          <div class="flex items-center gap-x-4">
            <DbAvatarGroup size="lg">
              <DbChip
                :show="(list as MemberInquiry).admin_new_message ?? false"
                inset
                color="secondary"
              >
                <DbAvatar
                  :src="(list as MemberInquiry)?.adminProfiles?.avatar_url ?? ''"
                  :alt="(list as MemberInquiry)?.adminProfiles?.nickname ?? ''"
                />
              </DbChip>
              <DbChip
                :show="(list as MemberInquiry).request_new_message ?? false"
                inset
                color="success"
              >
                <DbAvatar
                  :src="(list as MemberInquiry)?.requestUserProfiles?.avatar_url ?? ''"
                  :alt="(list as MemberInquiry)?.requestUserProfiles?.nickname ?? ''"
                />
              </DbChip>
            </DbAvatarGroup>
            <p class="text-lg font-semibold text-neutral-500 dark:text-neutral-400 break-words">
              {{ $t('inquiry.label.channelName', { channelName: (list as MemberInquiry).channel_code }) }}
            </p>
          </div>
          <div class="flex items-center gap-x-2">
            <DbBadge
              :label="(list as MemberInquiry).activated ? $t('text.inquiring') : $t('text.inquiryCompleted')"
              variant="outline"
              :color="(list as MemberInquiry).activated ? 'secondary' : 'neutral'"
              size="lg"
            />
          </div>
        </div>
        <ANuxtTime :date-time="list.created_at" />
      </DbCard>
    </div>
    <ClientOnly>
      <template #default>
        <DbPagination
          v-model:page="listCurrentPage"
          class="w-fit flex justify-center mx-2 my-2"
          color="neutral"
          variant="subtle"
          :sibling-count="1"
          :size="windowSize < 380 ? 'xs' : 'lg'"
          :show-edges="false"
          :items-per-page="pageSize"
          :total="listData?.count"
          @update:page="(changedPage: number) => listCurrentPage = changedPage"
        />
      </template>
      <template #fallback>
        <div class="w-[204px] h-[24px] sm:w-[276px] sm:h-[36px] rounded-lg ring ring-neutral-200 dark:ring-neutral-700 animate-pulse m-2" />
      </template>
    </ClientOnly>
  </div>
</template>
