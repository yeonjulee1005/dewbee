import { createClient } from '@supabase/supabase-js'
import { subDays } from 'date-fns'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const user = await serverSupabaseUser(event)

  const schema = String(getQuery(event).schema ?? 'public')
  const weeklyTableName = String(getQuery(event).weeklyTableName)
  const dailyTableName = String(getQuery(event).dailyTableName)
  const spendListTableName = String(getQuery(event).spendListTableName)

  try {
    const { data: weeklyResultData, error: weeklyResultDataError }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
      .from(weeklyTableName)
      .select('*')
      .order('created_at', { ascending: false })
      .eq('deleted', false)
      .limit(1)
      .single()

    if (weeklyResultDataError) {
      console.error(weeklyResultDataError)
    }

    if (weeklyResultData) {
      try {
        const expectedWeeklyDate = new Date(weeklyResultData.created_at)
        const dateBefore7Days = subDays(expectedWeeklyDate, 7)

        const { data: dailyResultData, error: dailyResultDataError }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
          .from(dailyTableName)
          .select('*')
          .gte('created_at', dateBefore7Days.toISOString())
          .lte('created_at', weeklyResultData.created_at)
          .eq('update_user_id', user?.id ?? '')
          .eq('deleted', false)
          .order('created_at', { ascending: false })

        if (dailyResultDataError) {
          throw createError({ statusMessage: dailyResultDataError.message })
        }

        const { data: spendListData }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
          .from(spendListTableName)
          .select('*')
          .gte('created_at', subDays(dailyResultData.at(-1).created_at, 1).toISOString())
          .lte('created_at', dailyResultData.at(0).created_at)
          .eq('deleted', false)

        return { dailyResultData, spendListData, created_at: weeklyResultData.created_at }
      }
      catch (error) {
        console.error(error)
      }
    }

    return weeklyResultData
  }
  catch (error) {
    console.error(error)
  }
})
