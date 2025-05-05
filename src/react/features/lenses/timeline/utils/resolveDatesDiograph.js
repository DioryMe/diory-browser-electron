import { getStartAndEndTimes } from './getStartAndEndTimes'
import { resolveDates } from './resolveDates'
import { getDatesDiograph } from './getDatesDiograph'

export const resolveDatesDiograph = (diories) => {
  const { startTime, endTime } = getStartAndEndTimes(diories)
  const dates = resolveDates(startTime, endTime)
  return getDatesDiograph(dates, diories)
}
