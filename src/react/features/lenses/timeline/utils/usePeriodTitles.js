import { useSelector } from 'react-redux'

import { useGetHomeDiory } from '../../../home/utils/useGetHomeDiory'

import { splitDateToPeriods } from './splitDateToPeriods'
import { getPeriodTitle } from './getPeriodTitle'
import { getDioriesInPeriod } from './getDioriesInPeriod'
import { useShowTotalState } from './useShowTotalState'
import { getPeriodDiories } from './getPeriodDiories'

const getTimelineTitle = (diograph, showTotal) => {
  const totalAmount = getDioriesInPeriod('', diograph).length
  const selectedAmount = getPeriodDiories('', diograph).length
  return ({
    diory: {
      id: 'timeline',
      text: `Timeline (${showTotal ? totalAmount: selectedAmount})`,
    },
  })
}

const mapToTitle =
  (diograph, showTotal) =>
  ({ id }) => ({
    diory: {
      id,
      text: getPeriodTitle(id, diograph, showTotal),
    },
  })

export const usePeriodTitles = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const showTotal = useShowTotalState()
  const { getHomeDiory } = useGetHomeDiory()

  const timelineTitle = getTimelineTitle(diograph, showTotal)
  if (selectedPeriod === 'timeline') {
    return [timelineTitle]
  }

  const selectedPeriodTitles = splitDateToPeriods(selectedPeriod)
    .map((id) => getHomeDiory(id) || { id })
    .map(mapToTitle(diograph, showTotal))

  return [timelineTitle].concat(selectedPeriodTitles)
}
