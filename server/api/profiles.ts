import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const user = await serverSupabaseUser(event)

  if (!user?.id) {
    return {}
  }

  try {
    const { data, error } = await client
      .from('viewProfiles')
      .select('*')
      .eq('id', user?.id ?? '')
      .single()

    if (error) {
      console.error(error)
    }

    return data as Database['public']['Views']['viewProfiles']['Row']
  }
  catch (error) {
    console.error(error)
  }
})
