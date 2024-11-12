export const useWeekRangeDate = () => {
  const getTimestampzForDay = (dayCode: string) => {
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
    const currentDay = today.getDay()
    let diff = (targetDay - currentDay + 7) % 7

    if (diff === 0) {
      diff = 7
    }

    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + diff)

    const timestampz = targetDate.toISOString().split('T')[0]

    const weekBeforeDate = new Date(targetDate)
    weekBeforeDate.setDate(targetDate.getDate() - 7)
    const weekBeforeTimestampz = weekBeforeDate.toISOString().split('T')[0]

    return { timestampz, weekBeforeTimestampz }
  }

  return {
    getTimestampzForDay,
  }
}
