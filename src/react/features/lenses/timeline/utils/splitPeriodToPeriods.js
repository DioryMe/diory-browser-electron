export const splitPeriodToPeriods = (period) => {
  if (!period) return []

  const [date, time] = period.split('T')
  const datePeriods = date.split('-').map((_, index, part) => part.slice(0, index + 1).join('-'))

  if (!time) {
    return datePeriods
  }

  return datePeriods.concat([`${datePeriods[2]}T${time.slice(0, 2)}`])
}
