import { Octokit } from 'octokit'

export default defineEventHandler(async (event) => {
  const currentPage = Number(getQuery(event).currentPage ?? 1)
  const pageSize = Number(getQuery(event).pageSize ?? 5)

  const config = useRuntimeConfig()
  const octokit = new Octokit({
    auth: config.public.githubAccessToken,
  })

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
    page: currentPage,
    per_page: pageSize,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  return { data: data.data, count: totalCount.data.length }
})
