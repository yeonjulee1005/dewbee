<script setup lang="ts">
import { Octokit } from 'octokit'

const { t } = useCustomLocale()
const config = useRuntimeConfig()

const { windowSize } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.patchNote'),
})

const currentPage = ref(1)
const pageSize = ref(5)

const octokit = new Octokit({
  auth: config.public.githubAccessToken,
})

const { data: githubReleaseData, execute: executeGithubReleaseData, pending: pendingGithubReleaseData } = useAsyncData(async () => {
  const totalCount = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: 'yeonjulee1005',
    repo: 'dewbee',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  const data = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: 'yeonjulee1005',
    repo: 'dewbee',
    page: currentPage.value,
    per_page: pageSize.value,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  return data
    ? { releases: data.data, count: totalCount.data.length }
    : { releases: [], count: 0 }
}, {
  immediate: true,
  watch: [currentPage],
})

const parseMarkdown = (body: string) => {
  return body
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^\s*---\s*$/gm, '<hr>')
    .replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>')
    .replace(/^\s*-\s(.+)$/gm, '<li>$1</li>')
    .replace(/(?:\r\n|\r|\n)/g, '<br>')
}

onMounted(() => {
  executeGithubReleaseData()
})
</script>

<template>
  <div class="relative w-full h-[calc(100dvh-80px)] flex flex-col items-center overflow-y-scroll pb-6">
    <ASubPageTitle :title="$t('pageTitle.patchNote')" />
    <div
      v-if="!pendingGithubReleaseData"
      class="w-full flex flex-col gap-y-6 px-6 py-4 mt-2"
    >
      <div
        v-for="release in githubReleaseData?.releases"
        v-show="githubReleaseData?.releases"
        :key="release.id"
        class="w-full ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-lg px-6 py-4 cursor-pointer hover:ring-2 hover:ring-sky-500 transition-all duration-200 ease-in-out"
        @click="navigateTo(release.html_url, { external: true, open: { target: 'blank' } })"
      >
        <div class="flex items-center gap-x-2">
          <UAvatar
            size="3xl"
            :src="release.author.avatar_url"
          />
          <div class="flex flex-col gap-y-1.5">
            <span>
              {{ release.author.login }}
            </span>
            <div class="flex items-center gap-x-3">
              <UBadge
                variant="subtle"
                color="warning"
                :label="release.prerelease ? $t('label.prerelease') : $t('label.release')"
              />
              <UBadge
                variant="subtle"
                color="info"
                :label="release.tag_name"
              />
            </div>
          </div>
        </div>
        <div class="w-full mt-5">
          <div
            v-dompurify-html="parseMarkdown(release.body ?? '')"
            class="markdown-template text-sm leading-5"
          />
        </div>
        <div class="w-full flex justify-end gap-x-2">
          <UBadge
            variant="outline"
            :label="$t('label.releaseDate')"
          />
          <ANuxtTime
            class="text-sm text-neutral-500 dark:text-neutral-400"
            :date-time="release.published_at"
          />
        </div>
      </div>
      <div v-show="!githubReleaseData?.releases">
        <p class="text-xl font-light text-neutral-800 dark:text-neutral-200 py-10">
          {{ $t('placeholder.noPatchNote') }}
        </p>
      </div>
    </div>
    <div
      v-else
      class="h-[600px] flex justify-center items-center"
    >
      <Icon
        name="i-svg-spinners-pulse-multiple"
        class="w-28 h-28"
      />
    </div>
    <UPagination
      v-model:page="currentPage"
      class="w-fit flex justify-center mx-2 my-2"
      color="neutral"
      variant="subtle"
      :sibling-count="1"
      :size="windowSize < 340 ? 'xs' : 'lg'"
      :items-per-page="pageSize"
      :total="githubReleaseData?.count"
      show-edges
      @update:page="(changedPage: number) => currentPage = changedPage"
    />
  </div>
</template>

<style lang="scss" scoped>
.markdown-template {
  ::v-deep(code) {
    border: 1px solid #f99670;
    font-weight: 700;
    border-radius: 6px;
    padding: 1.5px 4px;
  }
  ::v-deep(ul),
  ::v-deep(ol) {
    padding: 0 10px;
  }
  ::v-deep(ol) {
    list-style-type: decimal;
  }
  ::v-deep(li) {
    margin: 8px 0 0 16px;
    height: fit-content;
    list-style-type: disc;
  }
  ::v-deep(br) {
    display: none;
  }
  ::v-deep(hr) {
    width: 65%;
    margin: 20px 0;
    border: none;
    height: 20px;
    background-image: var(--zigzag-pattern);
    background-repeat: repeat-x;
  }
}
</style>
