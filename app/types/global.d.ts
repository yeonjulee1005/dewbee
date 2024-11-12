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

interface Realtime {
  id: string
  amount: number
  profiles: Database['public']['Tables']['profiles']['Row']
  currency_id: string
  currency: FilterDatabase['filter']['Tables']['currency']['Row']
  spend_category_id: string
  spendCategory: FilterDatabase['filter']['Tables']['spendCategory']['Row']
  update_user_id: string
  created_at: string
  updated_at: string
  deleted: boolean
}
