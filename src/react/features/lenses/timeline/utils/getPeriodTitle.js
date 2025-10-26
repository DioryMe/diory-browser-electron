import { getDioriesInPeriod } from './getDioriesInPeriod'
import { getPeriodDiories } from './getPeriodDiories'

export const getPeriodTitleSelected = (periodId, diograph) => {
  const diories = getPeriodDiories(periodId, diograph)
  console.log(periodId, diories)
  const amount = diories.reduce((sum, { links = [] }) => sum + links.length, 0)
  return `${periodId.split('-').at(-1)} (${amount})`
}

export const getPeriodTitleTotal = (periodId, diograph) => {
  const totalAmount = getDioriesInPeriod(periodId, diograph).length
  return `${periodId.split('-').at(-1)} (${totalAmount})`
}

export const getPeriodTitle = (periodId, diograph, showTotal) =>
  showTotal ? getPeriodTitleTotal(periodId, diograph) : getPeriodTitleSelected(periodId, diograph)