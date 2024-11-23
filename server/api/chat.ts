import { createClient } from '@supabase/supabase-js'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const user = await serverSupabaseUser(event)

  const schema = String(getQuery(event).schema ?? 'public')
  const tableName = String(getQuery(event).tableName) as 'viewSpendList' | 'viewWeeklyResultList'
  const matchOpt = String(getQuery(event).matchOpt ?? 'update_user_id')
  const matchOptVal = String(getQuery(event).matchOptVal ?? user?.id)

  try {
    const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
      .from(tableName)
      .select('*')
      .eq(matchOpt, matchOptVal)
      .eq('deleted', false)
      .single()

    if (error) {
      throw createError({ statusMessage: error.message })
    }

    return data
  }
  catch (error) {
    console.error(error)
  }
})
