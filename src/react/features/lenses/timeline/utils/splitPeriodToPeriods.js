export const splitPeriodToPeriods = (period) => {
  if (!period) return []

  const [date] = period.split('T')
  return date.split('-').map((_, index, part) => part.slice(0, index + 1).join('-'))
}
