<script setup lang="ts">
import { Octokit } from 'octokit'

const { t } = useLocale()
const config = useRuntimeConfig()

useHead({
  title: t('pageTitle.patchNote'),
})

const page = ref(1)
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
    page: page.value,
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
  watch: [page],
})

onMounted(() => {
  executeGithubReleaseData()
})
</script>

<template>
  <div class="relative w-full h-[calc(100dvh-80px)] overflow-y-scroll pb-6">
    <ASubPageTitle :title="$t('pageTitle.patchNote')" />
    <div
      v-if="!pendingGithubReleaseData"
      class="w-full flex flex-col gap-y-6 px-6 py-4 mt-2"
    >
      <div
        v-for="release in githubReleaseData?.releases"
        v-show="githubReleaseData?.releases"
        :key="release.id"
        class="w-full ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-lg px-6 py-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 ease-in-out"
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
          <p
            v-for="(body, index) in release.body?.split('\r\n')"
            :key="index"
            class="text-sm text-neutral-500 dark:text-neutral-400 leading-6"
          >
            {{ body }}
          </p>
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
      v-model:page="page"
      class="flex justify-center mx-2 my-2"
      color="neutral"
      variant="subtle"
      :sibling-count="3"
      :items-per-page="pageSize"
      :total="githubReleaseData?.count ?? 0"
      show-edges
      @update:page="(changedPage: number) => page = changedPage"
    />
  </div>
</template>
