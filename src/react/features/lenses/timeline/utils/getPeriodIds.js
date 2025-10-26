import { unique } from '../../../../utils/unique'

import { getStartAndEndTimes } from './getStartAndEndTimes'
import { resolveChildPeriodIds } from './resolveChildPeriodIds'
import { getDioriesInPeriod } from './getDioriesInPeriod'

const getYearPeriodIds = (diograph) =>
  Object.values(diograph)
    .filter(({ date }) => date)
    .map(({ date }) => date.slice(0, 4))
    .filter(unique)
    .sort()

const getChildPeriodIds = (selectedPeriodId, diograph) => {
  const diories = getDioriesInPeriod(selectedPeriodId, diograph)
  const { startTime, endTime } = getStartAndEndTimes(diories)

  return resolveChildPeriodIds(selectedPeriodId, startTime, endTime)
}

export const getPeriodIds = (selectedPeriod, diograph) =>
  selectedPeriod === 'timeline'
    ? getYearPeriodIds(diograph)
    : getChildPeriodIds(selectedPeriod, diograph)
