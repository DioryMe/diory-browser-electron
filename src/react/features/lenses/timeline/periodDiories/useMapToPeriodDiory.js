import { useSelector } from 'react-redux'
import { useGetDioryById } from '../../../diograph/utils/useGetDioryById'

import { getDioriesInPeriod } from '../utils/timelineUtils'
import { getPeriodDiories } from './getPeriodDiories'
import { isNotPeriodId } from '../utils/periodIdUtils'

const resolveAmount = (periodId, showTotal, diograph) => {
  const periodKey = periodId === 'timeline' ? '' : periodId
  if (showTotal) {
    return getDioriesInPeriod(periodKey, diograph).length
  }

  const periodDiories = getPeriodDiories(periodKey, diograph)
  return periodDiories.reduce((sum, { links = [] }) => {
    const nonPeriodLinks = links.map(({ id }) => id).filter(isNotPeriodId)
    return sum + nonPeriodLinks.length
  }, 0)
}

const getPeriodTitle = (periodId, showTotal, diograph) => {
  const amount = resolveAmount(periodId, showTotal, diograph)
  const title = periodId === 'timeline' ? 'All' : periodId.split('-').at(-1)
  return `${title} (${amount})`
}

export const useMapToPeriodDiory = (diograph) => {
  const { showPeriodMemories } = useSelector((state) => state.lenses)
  const { getDiory } = useGetDioryById(diograph)

  return (periodId) => ({
    ...getDiory(periodId),
    id: periodId,
    text: getPeriodTitle(periodId, showPeriodMemories, diograph),
  })
}
