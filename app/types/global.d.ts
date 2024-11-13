/**
 * ! Global Interface !
 */

type SerializeObject = /* unresolved */ any

interface PlanList {
  title: string
  description: string
  fee: {
    amount: string
    period: string
    vat: string
  }
  features: string[]
}

/**
 * ! Spend List !
 */

type Realtime = Database['public']['Views']['viewSpendList']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
  currency: FilterDatabase['filter']['Tables']['currency']['Row']
  spendCategory: FilterDatabase['filter']['Tables']['spendCategory']['Row']
}

type DailyResult = Database['public']['Views']['viewDailyResultList']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
  currency: FilterDatabase['filter']['Tables']['currency']['Row']
}

type WeeklyResult = Database['public']['Views']['viewWeeklyResultList']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
  currency: FilterDatabase['filter']['Tables']['currency']['Row']
  endDate: FilterDatabase['filter']['Tables']['endDate']['Row']
}
