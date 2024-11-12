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
