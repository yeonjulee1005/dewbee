export const useLocalTimezone = () => {
  const { currentLocalTimezoneOffset } = storeToRefs(useUserDataStore())

  const getWeeklyTimestampz = (dayCode: string) => {
    const dayMap: Record<string, number> = {
      EDC001: 1,
      EDC002: 2,
      EDC003: 3,
      EDC004: 4,
      EDC005: 5,
      EDC006: 6,
      EDC007: 0,
    }

    const targetDay = dayMap[dayCode as keyof typeof dayMap]

    if (targetDay === undefined) {
      return null
    }

    const today = new Date()
    const currentDay = today.getUTCDay()

    let diff = (targetDay - currentDay + 7) % 7

    if (diff === 0) {
      diff = 7
    }

    const targetDate = new Date()
    targetDate.setDate(today.getDate() + diff)

    const weekBeforeDate = new Date(targetDate)
    weekBeforeDate.setDate(targetDate.getDate() - 7)

    const startTimestampz = weekBeforeDate.toISOString().split('T')[0] + 'T00:00:00.000Z'
    const endTimestampz = targetDate.toISOString().split('T')[0] + 'T00:00:00.000Z'

    const gteDate = adjustTimezone(startTimestampz, currentLocalTimezoneOffset.value)
    const lteDate = adjustTimezone(endTimestampz, currentLocalTimezoneOffset.value)

    return { gteDate, lteDate }
  }

  const adjustTimezone = (dateString: string, offset: number) => {
    const date = new Date(dateString)
    date.setHours(date.getHours() - offset)
    return date.toISOString().replace('T', ' ').split('.')[0]
  }

  return {
    getWeeklyTimestampz,
  }
}
