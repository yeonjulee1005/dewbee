import { createClient } from '@supabase/supabase-js'
import type { PostgrestError } from '@supabase/supabase-js'

export const useFetchComposable = () => {
  const toast = useToast()
  const config = useRuntimeConfig()
  const client = useSupabaseClient()

  /**
   * ! Load Data !
   */

  // const fetchData = (table: string, queryString: string, conditions: string, matchOpt?: string, matchOptVal?: string | number | boolean, secondMatchOpt?: string, secondMatchOptVal?: string | number | boolean, thirdMatchOpt?: string, thirdMatchOptVal?: string | number | boolean, exceptionOpt?: string, exceptionOptVal?: string | number | boolean) => {
  //   switch (conditions) {
  //     case 'single' :
  //       return fetchSingleData(table, queryString)
  //     case 'count' :
  //       return fetchCountData(table, queryString)
  //     case 'option' :
  //       return fetchOptionData(table, queryString, matchOpt ?? '', matchOptVal ?? '')
  //     case 'option-count' :
  //       return fetchOptionCountData(table, queryString, matchOpt ?? '', matchOptVal ?? '')
  //     case 'single-option' :
  //       return fetchOptionSingleData(table, queryString, matchOpt ?? '', matchOptVal ?? '')
  //     case 'double-option' :
  //       return fetchDoubleOptionData(table, queryString, matchOpt ?? '', matchOptVal ?? '', secondMatchOpt ?? '', secondMatchOptVal ?? '')
  //     case 'double-option-exception' :
  //       return fetchDoubleOptionSingleExceptionData(table, queryString, matchOpt ?? '', matchOptVal ?? '', secondMatchOpt ?? '', secondMatchOptVal ?? '', exceptionOpt ?? '', exceptionOptVal ?? '')
  //     case 'double-option-single' :
  //       return fetchDoubleOptionSingleData(table, queryString, matchOpt ?? '', matchOptVal ?? '', secondMatchOpt ?? '', secondMatchOptVal ?? '')
  //     case 'double-option-count' :
  //       return fetchDoubleOptionCountData(table, queryString, matchOpt ?? '', matchOptVal ?? '', secondMatchOpt ?? '', secondMatchOptVal ?? '')
  //     case 'triple-option-single' :
  //       return fetchTripleOptionSingleData(table, queryString, matchOpt ?? '', matchOptVal ?? '', secondMatchOpt ?? '', secondMatchOptVal ?? '', thirdMatchOpt ?? '', thirdMatchOptVal ?? '')
  //     default :
  //       return fetchNormalData(table, queryString)
  //   }
  // }

  // const orderFetchData = async (table: string, queryString: string, orderType: string, orderValue: boolean, refrencedTable: string, matchOpt?: string, matchOptVal?: string | number | boolean) => {
  //   if (refrencedTable) {
  //     const { data, error } = await client
  //       .from(table)
  //       .select(queryString)
  //       .order(orderType, { ascending: orderValue })
  //       .order(orderType, { referencedTable: refrencedTable, ascending: orderValue })

  //     errorHandler('fetch Referenced Order Data', error)

  //     return data
  //   }
  //   else if (!matchOpt && !matchOptVal) {
  //     const { data, error } = await client
  //       .from(table)
  //       .select(queryString)
  //       .order(orderType, { ascending: orderValue })

  //     errorHandler('fetch Order Data', error)

  //     return data
  //   }
  //   else {
  //     const { data, error } = await client
  //       .from(table)
  //       .select(queryString)
  //       .eq(matchOpt ?? '', matchOptVal ?? '')
  //       .order(orderType, { ascending: orderValue })

  //     errorHandler('fetch Single Option Order Data', error)

  //     return data
  //   }
  // }

  const fetchPaginationData = async (table: string, queryString: string, rangeStart: number, rangeEnd: number, matchOpt?: string, matchOptVal?: string | number | boolean, secondMatchOpt?: string, secondMatchOptVal?: string | number | boolean) => {
    if (matchOpt && secondMatchOpt) {
      const { data, count, error }: SerializeObject = await client
        .from(table)
        .select(queryString, { count: 'exact' })
        .eq(matchOpt, matchOptVal ?? '')
        .eq(secondMatchOpt, secondMatchOptVal ?? '')
        .eq('deleted', false)
        .order('created_at', { ascending: false })
        .range(rangeStart, rangeEnd)

      errorHandler('fetch schema range option Data', error)

      return { data, count }
    }
    else if (matchOpt) {
      const { data, count, error }: SerializeObject = await client
        .from(table)
        .select(queryString, { count: 'exact' })
        .eq(matchOpt, matchOptVal ?? '')
        .eq('deleted', false)
        .order('created_at', { ascending: false })
        .range(rangeStart, rangeEnd)

      errorHandler('fetch schema range option Data', error)

      return { data, count }
    }
    else {
      const { data, count, error }: SerializeObject = await client
        .from(table)
        .select(queryString, { count: 'exact' })
        .range(rangeStart, rangeEnd)
        .eq('deleted', false)
        .order('created_at', { ascending: false })

      errorHandler('fetch schema range Data', error)

      return { data, count }
    }
  }

  const fetchRangeData = async (table: string, queryString: string, lessOpt: string, lessVal: string | number, greatOpt: string, greatVal: string | number, matchOpt?: string, matchOptVal?: string | number | boolean) => {
    if (matchOpt && matchOptVal) {
      const { data, count, error }: SerializeObject = await client
        .from(table)
        .select(queryString, { count: 'exact' })
        .eq('deleted', false)
        .lte(lessOpt, lessVal)
        .gte(greatOpt, greatVal)
        .eq(matchOpt, matchOptVal)
      errorHandler('fetch range option Data', error)

      return { data, count }
    }
    else {
      const { data, count, error }: SerializeObject = await client
        .from(table)
        .select(queryString, { count: 'exact' })
        .eq('deleted', false)
        .lte(lessOpt, lessVal)
        .gte(greatOpt, greatVal)
      errorHandler('fetch range option Data', error)

      return { data, count }
    }
  }

  const schemaFetchData = async (schema: string, table: string, queryString: string, customOrder?: string, customAscending?: boolean) => {
    const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
      .from(table)
      .select(queryString)
      .order(customOrder ?? 'index', { ascending: customAscending ?? true })

    errorHandler('fetch schema Data', error)

    return data
  }

  // const schemaFetchOptionData = async (schema: string, table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean, secondMatchOpt?: string, secondMatchOptVal?: string | number | boolean, thirdMatchOpt?: string, thirdMatchOptVal?: string | number | boolean) => {
  //   if (secondMatchOpt && thirdMatchOpt) {
  //     const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //       .from(table)
  //       .select(queryString)
  //       .eq(matchOpt, matchOptVal)
  //       .eq(secondMatchOpt, secondMatchOptVal)
  //       .eq(thirdMatchOpt, thirdMatchOptVal)
  //       .eq('deleted', false)

  //     errorHandler('fetch schema option Data', error)

  //     return data
  //   }
  //   else if (secondMatchOpt) {
  //     const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //       .from(table)
  //       .select(queryString)
  //       .eq(matchOpt, matchOptVal)
  //       .eq(secondMatchOpt, secondMatchOptVal)
  //       .eq('deleted', false)

  //     errorHandler('fetch schema option Data', error)

  //     return data
  //   }
  //   else {
  //     const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //       .from(table)
  //       .select(queryString)
  //       .eq(matchOpt, matchOptVal)
  //       .eq('deleted', false)

  //     errorHandler('fetch schema option Data', error)

  //     return data
  //   }
  // }

  // const schemaFetchOptionSortData = async (schema: string, table: string, queryString: string, customOrder: string, customAscending: boolean, matchOpt: string, matchOptVal: string | number | boolean, secondMatchOpt?: string, secondMatchOptVal?: string | number | boolean) => {
  //   if (secondMatchOpt) {
  //     const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //       .from(table)
  //       .select(queryString)
  //       .eq(matchOpt, matchOptVal)
  //       .eq(secondMatchOpt, secondMatchOptVal)
  //       .order(customOrder ?? 'index', { ascending: customAscending ?? true })
  //       .eq('deleted', false)

  //     errorHandler('fetch schema option sort Data', error)

  //     return data
  //   }
  //   else {
  //     const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //       .from(table)
  //       .select(queryString)
  //       .eq(matchOpt, matchOptVal)
  //       .order(customOrder ?? 'index', { ascending: customAscending ?? true })
  //       .eq('deleted', false)

  //     errorHandler('fetch schema option sort Data', error)

  //     return data
  //   }
  // }

  const schemaFetchOptionSingleData = async (schema: string, table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean) => {
    const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
      .from(table)
      .select(queryString)
      .eq(matchOpt, matchOptVal)
      .eq('deleted', false)
      .maybeSingle()

    errorHandler('fetch schema option single Data', error)

    return data
  }

  // const schemaFetchOptionExceptionData = async (schema: string, table: string, queryString: string, exceptionOpt: string, exceptionOptVal: string | number | boolean, matchOpt: string, matchOptVal: string | number | boolean, secondMatchOpt: string, secondMatchOptVal: string | number | boolean, thirdMatchOpt?: string, thirdMatchOptVal?: string | number | boolean, fourthMatchOpt?: string, fourthMatchOptVal?: string | number | boolean) => {
  //   if (fourthMatchOpt && thirdMatchOpt) {
  //     const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //       .from(table)
  //       .select(queryString)
  //       .neq(exceptionOpt, exceptionOptVal)
  //       .eq('deleted', false)
  //       .eq(matchOpt, matchOptVal)
  //       .eq(secondMatchOpt, secondMatchOptVal)
  //       .eq(thirdMatchOpt, thirdMatchOptVal)
  //       .eq(fourthMatchOpt, fourthMatchOptVal)

  //     errorHandler('fetch schema three option Data with exception', error)

  //     return data
  //   }
  //   else if (thirdMatchOpt) {
  //     const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //       .from(table)
  //       .select(queryString)
  //       .neq(exceptionOpt, exceptionOptVal)
  //       .eq('deleted', false)
  //       .eq(matchOpt, matchOptVal)
  //       .eq(secondMatchOpt, secondMatchOptVal)
  //       .eq(thirdMatchOpt, thirdMatchOptVal)

  //     errorHandler('fetch schema three option Data with exception', error)

  //     return data
  //   }
  //   else {
  //     const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //       .from(table)
  //       .select(queryString)
  //       .neq(exceptionOpt, exceptionOptVal)
  //       .eq('deleted', false)
  //       .eq(matchOpt, matchOptVal)
  //       .eq(secondMatchOpt, secondMatchOptVal)

  //     errorHandler('fetch schema two option Data with exception', error)

  //     return data
  //   }
  // }

  // const schemaFetchOptionRangeSingleData = async (schema: string, table: string, queryString: string, greatOpt: string, greatVal: string | number, lessOpt: string, lessVal: string | number) => {
  //   const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //     .from(table)
  //     .select(queryString)
  //     .lt(lessOpt, lessVal)
  //     .gt(greatOpt, greatVal)

  //   errorHandler('fetch schema range single Data', error)

  //   return data
  // }

  const schemaFetchRangeData = async (schema: string, table: string, queryString: string, rangeStart: number, rangeEnd: number, customOrder?: string, customAscending?: boolean, matchOpt?: string, matchOptVal?: string | number | boolean, secondMatchOpt?: string, secondMatchOptVal?: string | number | boolean) => {
    if (matchOpt && secondMatchOpt) {
      const { data, count, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
        .from(table)
        .select(queryString, { count: 'exact' })
        .eq(matchOpt, matchOptVal)
        .eq(secondMatchOpt, secondMatchOptVal)
        .eq('deleted', false)
        .range(rangeStart, rangeEnd)
        .order(customOrder ?? 'index', { ascending: customAscending ?? true })

      errorHandler('fetch schema range option Data', error)

      return { data, count }
    }
    else if (matchOpt) {
      const { data, count, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
        .from(table)
        .select(queryString, { count: 'exact' })
        .eq(matchOpt, matchOptVal)
        .eq('deleted', false)
        .range(rangeStart, rangeEnd)
        .order(customOrder ?? 'index', { ascending: customAscending ?? true })

      errorHandler('fetch schema range option Data', error)

      return { data, count }
    }
    else {
      const { data, count, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
        .from(table)
        .select(queryString, { count: 'exact' })
        .range(rangeStart, rangeEnd)
        .eq('deleted', false)
        .order(customOrder ?? 'index', { ascending: customAscending ?? true })

      errorHandler('fetch schema range Data', error)

      return { data, count }
    }
  }

  // const schemaFetchMultipleData = async (schema: string, table: string, queryString: string, option: string, multipleVal: string[]) => {
  //   const { data, error }: SerializeObject = await createClient(config.public.supabaseUrl, config.public.supabaseKey, { db: { schema } })
  //     .from(table)
  //     .select(queryString)
  //     .in(option, multipleVal)

  //   errorHandler('fetch schema multiple Data', error)

  //   return data
  // }

  // const fetchNormalData = async (table: string, queryString: string) => {
  //   const { data, error }: SerializeObject = await client
  //     .from(table)
  //     .select(queryString)
  //     .eq('deleted', false)

  //   errorHandler('fetch Normal Data', error)

  //   return data
  // }

  // const fetchCountData = async (table: string, queryString: string) => {
  //   const { data, count, error } = await client
  //     .from(table)
  //     .select(queryString, { count: 'exact' })

  //   errorHandler('fetch Data with count', error)

  //   return { fetchData: data, count }
  // }

  // const fetchSingleData = async (table: string, queryString: string) => {
  //   const { data, error } = await client
  //     .from(table)
  //     .select(queryString)
  //     .maybeSingle()

  //   errorHandler('fetch SingleData with count', error)

  //   return data
  // }

  // const fetchOptionData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean) => {
  //   const { data, error } = await client
  //     .from(table)
  //     .select(queryString)
  //     .eq(matchOpt, matchOptVal)
  //     .eq('deleted', false)

  //   errorHandler('fetch OptionData', error)

  //   return data
  // }

  // const fetchOptionSingleData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean) => {
  //   const { data, error } = await client
  //     .from(table)
  //     .select(queryString)
  //     .eq(matchOpt, matchOptVal)
  //     .maybeSingle()

  //   errorHandler('fetch OptionData Single', error)

  //   return data
  // }

  // const fetchOptionCountData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean) => {
  //   const { data, count, error } = await client
  //     .from(table)
  //     .select(queryString, { count: 'exact' })
  //     .eq(matchOpt, matchOptVal)

  //   errorHandler('fetch OptionData with count', error)

  //   return { fetchData: data, count }
  // }

  // const fetchDoubleOptionData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean, secondMatchOpt: string, secondMatchOptVal: string | number | boolean) => {
  //   const { data, error } = await client
  //     .from(table)
  //     .select(queryString)
  //     .eq(matchOpt, matchOptVal)
  //     .eq(secondMatchOpt, secondMatchOptVal)
  //     .eq('deleted', false)

  //   errorHandler('fetch Double OptionData', error)

  //   return data
  // }

  // const fetchDoubleOptionSingleData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean, secondMatchOpt: string, secondMatchOptVal: string | number | boolean) => {
  //   const { data, error } = await client
  //     .from(table)
  //     .select(queryString)
  //     .eq(matchOpt, matchOptVal)
  //     .eq(secondMatchOpt, secondMatchOptVal)
  //     .maybeSingle()

  //   errorHandler('fetch Double OptionData Single', error)

  //   return data
  // }

  // const fetchDoubleOptionSingleExceptionData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean, secondMatchOpt: string, secondMatchOptVal: string | number | boolean, exceptionOpt: string, exceptionOptVal: string | number | boolean) => {
  //   const { data, error } = await client
  //     .from(table)
  //     .select(queryString)
  //     .eq(matchOpt, matchOptVal)
  //     .eq(secondMatchOpt, secondMatchOptVal)
  //     .neq(exceptionOpt, exceptionOptVal)

  //   errorHandler('fetch Double OptionData with exception', error)

  //   return data
  // }

  // const fetchDoubleOptionCountData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean, secondMatchOpt: string, secondMatchOptVal: string | number | boolean) => {
  //   const { data, count, error } = await client
  //     .from(table)
  //     .select(queryString, { count: 'exact' })
  //     .eq(matchOpt, matchOptVal)
  //     .eq(secondMatchOpt, secondMatchOptVal)

  //   errorHandler('fetch Double OptionData with count', error)

  //   return { fetchData: data, count }
  // }

  // const fetchTripleOptionSingleData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string | number | boolean, secondMatchOpt: string, secondMatchOptVal: string | number | boolean, thirdMatchOpt: string, thirdMatchOptVal: string | number | boolean) => {
  //   const { data, count, error } = await client
  //     .from(table)
  //     .select(queryString, { count: 'exact' })
  //     .eq(matchOpt, matchOptVal)
  //     .eq(secondMatchOpt, secondMatchOptVal)
  //     .eq(thirdMatchOpt, thirdMatchOptVal)
  //     .maybeSingle()

  //   errorHandler('fetch Triple OptionData with count', error)

  //   return { fetchData: data, count }
  // }

  // const fetchColumnArrayData = async (table: string, queryString: string, matchOpt: string, matchOptVal: string[] | number[] | boolean[]) => {
  //   const { data, error } = await client
  //     .from(table)
  //     .select(queryString)
  //     .in(matchOpt, matchOptVal)

  //   errorHandler('fetch Column Array Data', error)

  //   return data
  // }

  // const fetchCountOnlyData = async (table: string) => {
  //   const { count, error } = await client
  //     .from(table)
  //     .select('id', { count: 'exact', head: true })

  //   errorHandler('fetch only count', error)

  //   return count
  // }

  // const insertData = async (table: string, insertData: SerializeObject, returnValue: boolean) => {
  //   if (returnValue) {
  //     const { data, error } = await client
  //       .from(table)
  //       .insert(insertData)
  //       .select()

  //     errorHandler('insertData', error)

  //     return data
  //   }
  //   else {
  //     const { error } = await client
  //       .from(table)
  //       .insert(insertData)

  //     errorHandler('insertData', error)

  //     return error
  //   }
  // }

  const errorHandler = (fetchName: string, error: PostgrestError | null) => {
    if (error) {
      toast.add({ title: error.message, description: `at ${fetchName}`, color: 'error' })
    }
  }

  const logout = async () => {
    await client.auth.signOut()
  }

  return {
    // fetchData,
    // orderFetchData,
    fetchPaginationData,
    fetchRangeData,
    schemaFetchData,
    // schemaFetchOptionData,
    // schemaFetchOptionSortData,
    schemaFetchOptionSingleData,
    // schemaFetchOptionExceptionData,
    // schemaFetchOptionRangeSingleData,
    schemaFetchRangeData,
    // schemaFetchMultipleData,
    // fetchColumnArrayData,
    // fetchCountOnlyData,
    // insertData,
    logout,
  }
}
