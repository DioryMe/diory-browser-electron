import { useSelector } from 'react-redux'

import { getDiory } from '../../../diograph/utils/getDiory'
import { getDioriesInPeriod } from '../utils/timelineUtils'
import { getPeriodsInDiograph } from './getPeriodsInDiograph'
import { isNotPeriodId } from './periodIdUtils'
import { getDiographKey } from '../../../diograph/utils/diographUtils'

const resolveAmount = (periodId, showTotal, diograph) => {
  const periodKey = periodId === 'timeline' ? '' : periodId
  if (showTotal) {
    return getDioriesInPeriod(periodKey, diograph).length
  }

  const diographPeriods = getPeriodsInDiograph(periodKey, diograph)
  return diographPeriods.reduce((sum, { links = [] }) => {
    const nonPeriodLinks = links.map(({ id }) => id).filter(isNotPeriodId)
    return sum + nonPeriodLinks.length
  }, 0)
}

const getPeriodTitle = (periodId, showTotal, diograph) => {
  const amount = resolveAmount(periodId, showTotal, diograph)
  const title = periodId === 'timeline' ? 'All' : periodId.split('-').at(-1)
  return `${title} (${amount})`
}

export const useMapToPeriod = (diograph) => {
  const { address } = useSelector((state) => state.diograph)

  return (periodId) => ({
    ...getDiory(getDiographKey(address, periodId), diograph),
    id: periodId,
    text: getPeriodTitle(periodId, true, diograph),
  })
}
