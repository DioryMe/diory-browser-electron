import { getDioriesInPeriod } from './getDioriesInPeriod'

export const getPeriodTitle = (periodId, diories, diograph) => {
  const amount = (diories && diories.length) || 0
  const totalAmount = getDioriesInPeriod(periodId, diograph).length
  return `${periodId.split('-').at(-1)} (${amount}/${totalAmount})`
}
