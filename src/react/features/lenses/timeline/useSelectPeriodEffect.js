import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatchActions } from '../../../store'

import { getStoryDiories } from '../../diograph/utils/getStoryDiories'
import { selectPeriod } from '../lensesActions'
import { getStartAndEndTimes } from './utils/timelineUtils'
import { splitDateToPeriodIds } from './periods/periodIdUtils'

const resolvePeriod = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return 'timeline'
  }

  const startPeriods = splitDateToPeriodIds(new Date(startTime).toISOString()).reverse()
  const endPeriods = splitDateToPeriodIds(new Date(endTime).toISOString()).reverse()
  return startPeriods.find((startPeriod, index) => startPeriod === endPeriods[index]) || 'timeline'
}

export const useSelectPeriodEffect = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story, memories } = getStoryDiories(storyKey, diograph)

  const diories = [story].concat(memories).filter(Boolean)
  const { startTime, endTime } = getStartAndEndTimes(diories)
  const periodId = resolvePeriod(startTime, endTime)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(selectPeriod({ id: periodId }))
  }, [dispatch, periodId])
}
