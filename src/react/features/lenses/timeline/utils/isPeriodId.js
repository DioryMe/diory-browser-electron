export const isPeriodId = (period) => {
  const date = new Date(period)
  return !Number.isNaN(date.valueOf())
}
