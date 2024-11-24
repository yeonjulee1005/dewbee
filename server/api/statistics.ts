import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  const tableName = String(getQuery(event).tableName) as 'viewSpendList'
  const isAscending = Boolean(getQuery(event).isAscending)

  try {
    const { data, error }: SerializeObject = await client
      .from(tableName)
      .select('*')
      .eq('update_user_id', user?.id ?? '')
      .order('created_at', { ascending: isAscending ?? true })
      .eq('deleted', false)

    if (error) {
      throw createError({ statusMessage: error.message })
    }

    return data
  }
  catch (error) {
    console.error(error)
  }
})
