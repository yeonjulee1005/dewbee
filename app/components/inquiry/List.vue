<script setup lang="ts">
const { width } = useWindowSize()

const props = withDefaults(defineProps<{
  listType?: 'adminGuest' | 'adminMember' | 'member' | undefined
  listPending?: boolean
  listData?: {
    list: any[]
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
      <UCard
        v-for="(list, index) in listData?.list"
        :key="index"
        :ui="{
          root: 'cursor-pointer ring ring-neutral-400 dark:ring-neutral-600 hover:ring-2 hover:ring-sky-400 dark:hover:ring-sky-600 transition-all duration-200 ease-in-out',
          body: 'flex flex-col gap-y-2 p-4',
        }"
        @click="clickList(list)"
      >
        <p class="text-lg font-semibold">
          {{ list.email }}
        </p>
        <p class="w-full text-sm font-light text-neutral-500 dark:text-neutral-400 break-words">
          {{ list.message }}
        </p>
        <ANuxtTime :date-time="list.created_at" />
      </UCard>
    </div>
    <UPagination
      v-model:page="listCurrentPage"
      class="w-fit flex justify-center mx-2 my-2"
      color="neutral"
      variant="subtle"
      :sibling-count="1"
      :size="width < 340 ? 'xs' : 'lg'"
      showo-edge
      :items-per-page="pageSize"
      :total="listData?.count"
      show-edges
      @update:page="(changedPage: number) => listCurrentPage = changedPage"
    />
  </div>
</template>
