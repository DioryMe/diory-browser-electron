import { useEffect } from 'react'

import { useDispatchActions } from '../../../store'
import { useStoryDiories } from '../../diograph/utils/useDiories'

import { selectPeriod } from '../lensesActions'

import { getStartAndEndTimes } from './utils/timelineUtils'
import { splitDateToPeriodIds } from './utils/periodIdUtils'

const resolvePeriod = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return 'timeline'
  }

  const startPeriods = splitDateToPeriodIds(new Date(startTime).toISOString()).reverse()
  const endPeriods = splitDateToPeriodIds(new Date(endTime).toISOString()).reverse()
  return startPeriods.find((startPeriod, index) => startPeriod === endPeriods[index]) || 'timeline'
}

export const useSelectPeriodEffect = () => {
  const { story, memories } = useStoryDiories()
  const diories = [story].concat(memories)
  const { startTime, endTime } = getStartAndEndTimes(diories)
  const periodId = resolvePeriod(startTime, endTime)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(selectPeriod({ id: periodId }))
  }, [dispatch, periodId])
}
