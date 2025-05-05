export const splitPeriodToPeriods = (period) => {
  const [date, time] = period.split('T')
  const datePeriods = date.split('-').map((_, index, part) => part.slice(0, index + 1).join('-'))

  if (!time) {
    return datePeriods
  }

  const timePeriods = time.split(':').map((_, index, part) => part.slice(0, index + 1).join('-'))
  return datePeriods.concat(timePeriods.map((timePeriod) => `${datePeriods[2]}T${timePeriod}`))
}
