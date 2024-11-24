import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const schema = String(getQuery(event).schema ?? 'public')
  const tableName = String(getQuery(event).tableName) as 'viewSpendList' | 'viewWeeklyResultList'
  const startPage = Number(getQuery(event).startPage)
  const endPage = Number(getQuery(event).endPage)
  const ascendingName = String(getQuery(event).ascending ?? 'created_at')
  const isAscending = Boolean(getQuery(event).isAscending)

  try {
    const { data, count, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
      .from(tableName)
      .select('*', { count: 'exact' })
      .range(startPage, endPage)
      .order(ascendingName, { ascending: isAscending ?? true })
      .eq('deleted', false)

    if (error) {
      throw createError({ statusMessage: error.message })
    }

    return { data, count }
  }
  catch (error) {
    console.error(error)
  }
})
