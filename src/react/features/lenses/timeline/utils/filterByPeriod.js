import { startsWithPeriod } from './startsWithPeriod'

export const filterByPeriod = (period, diograph) =>
  Object.fromEntries(
    Object.entries(diograph).filter(([, diory]) => startsWithPeriod(diory, period))
  )
