import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const tableName = String(getQuery(event).tableName)

  try {
    const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema: 'filter' } })
      .from(tableName)
      .select('*')
      .order('index', { ascending: true })
      .eq('deleted', false)

    if (error) {
      console.error(error)
    }

    return data
  }
  catch (error) {
    console.error(error)
  }
})
