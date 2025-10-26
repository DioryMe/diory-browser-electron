import { useSelector } from 'react-redux'

import { useGetHomeDiory } from '../../../home/utils/useGetHomeDiory'

import { splitDateToPeriods } from './splitDateToPeriods'
import { getPeriodTitle } from './getPeriodTitle'
import { getDioriesInPeriod } from './getDioriesInPeriod'

const getTimelineTitle = (selectedPeriod, diograph) => ({
  diory: {
    id: 'timeline',
    text: `Timeline (${getDioriesInPeriod('', diograph).length})`,
  },
  isSelected: selectedPeriod === 'timeline',
})

// TODO amount open ? all : linked
const mapToPeriod =
  (selectedPeriod, diograph) =>
  ({ id, links }) => ({
    diory: {
      id,
      text: getPeriodTitle(id, links, diograph),
    },
    isSelected: selectedPeriod === id,
  })

export const usePeriodTitles = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { getHomeDiory } = useGetHomeDiory()

  const timelineTitle = getTimelineTitle(selectedPeriod, diograph)
  if (selectedPeriod === 'timeline') {
    return [timelineTitle]
  }

  const selectedPeriodTitles = splitDateToPeriods(selectedPeriod)
    .map((id) => getHomeDiory(id) || { id })
    .map(mapToPeriod(selectedPeriod, diograph))

  return [timelineTitle].concat(selectedPeriodTitles)
}
