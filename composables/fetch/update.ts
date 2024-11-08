import { createClient } from '@supabase/supabase-js'
import type { PostgrestError } from '@supabase/supabase-js'

export const useUpdateComposable = () => {
  const toast = useToast()
  const config = useRuntimeConfig()
  const client = useSupabaseClient()

  /**
   * ! Update & Upsert Data !
   */

  const updateData = async (table: string, updateData: SerializeObject | never, id: string) => {
    const { error } = await client
      .from(table)
      .update(updateData as never)
      .eq('id', id)

    errorHandler('updateData', error)
  }

  const upsertData = async (table: string, upsertData: SerializeObject, matOpt?: string, matOptVal?: string) => {
    if (matOpt) {
      const { data, error } = await client
        .from(table)
        .upsert(upsertData, { defaultToNull: true })
        .eq(matOpt, matOptVal ?? '')
        .select()

      errorHandler('upsertData using match option', error)

      return data
    }
    else {
      const { data, error } = await client
        .from(table)
        .upsert(upsertData, { defaultToNull: true })
        .select()

      errorHandler('upsertData without match option', error)

      return data
    }
  }

  const schemaUpdateData = async (schema: string, table: string, updateData: SerializeObject, id: string) => {
    const { data, error } = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
      .from(table)
      .update(updateData)
      .eq('id', id)
      .select()

    errorHandler('custom schema updateData', error)

    return data
  }

  const schemaUpsertData = async (schema: string, table: string, upsertData: SerializeObject, matOpt?: string, matOptVal?: string) => {
    if (matOpt) {
      const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
        .from(table)
        .upsert(upsertData)
        .eq(matOpt, matOptVal ?? '')
        .select()

      errorHandler('custom schema upsertData using match option', error)

      return data
    }
    else {
      const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
        .from(table)
        .upsert(upsertData)
        .select()

      errorHandler('custom schema upsertData without match option', error)

      return data
    }
  }

  const errorHandler = (fetchName: string, error: PostgrestError | null) => {
    if (error) {
      toast.add({ title: error.message, description: `at ${fetchName}`, color: 'error' })
    }
  }

  return {
    updateData,
    upsertData,
    schemaUpdateData,
    schemaUpsertData,
  }
}
