import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../../store'

import { selectPeriod } from '../../lensesActions'

import { splitPeriodToPeriods } from './splitPeriodToPeriods'
import { filterByPeriod } from './filterByPeriod'
import { useDiories } from '../../../diograph/utils/useDiories'

export const useTimeline = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { diograph } = useSelector((state) => state.diograph)

  const { dispatch } = useDispatchActions()
  return {
    key: 'timeline',
    id: 'timeline',
    text: `Timeline (${Object.values(diograph).filter(({ date }) => date).length})`,
    isSelected: selectedPeriod === 'timeline',
    onClick: () => dispatch(selectPeriod('timeline')),
  }
}

const getTitle = (period, index, diograph) => {
  const [date, time] = period.split('T')
  const periodTitle = time ? `${time}:00` : date.split('-')[index]
  const amount = Object.keys(filterByPeriod(period, diograph)).length
  return `${periodTitle} (${amount})`
}

export const useTimelineTitles = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { story } = useDiories()

  const { selectedPeriod } = useSelector((state) => state.lenses)
  const periods = splitPeriodToPeriods(selectedPeriod || story.date).filter(
    (period) => period !== 'timeline'
  )

  return periods
    .map((period, index) => ({
      key: period,
      id: period,
      text: getTitle(period, index, diograph),
      isSelected: selectedPeriod === period,
    }))
    .concat(
      selectedPeriod
        ? [
            {
              key: 'clear',
              id: null,
              text: 'Clear',
            },
          ]
        : []
    )
}
