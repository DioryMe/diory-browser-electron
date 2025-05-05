import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../../store'

import { selectPeriod } from '../../lensesActions'

import { splitPeriodToPeriods } from './splitPeriodToPeriods'
import { filterByPeriod } from './filterByPeriod'
import { useDiories } from '../../../diograph/utils/useDiories'

const useStoryTitle = () => {
  const { story, memories } = useDiories()
  const amount = memories.filter(({ date }) => date).length
  console.log(story)
  return {
    key: 'story',
    text: `${story.text || story.date || story.id} (${amount})`,
    isSelected: true,
  }
}

const useTimeline = () => {
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

  const timelineTitle = useTimeline()
  const storyTitle = useStoryTitle()

  const { selectedPeriod } = useSelector((state) => state.lenses)
  if (!selectedPeriod) {
    return [timelineTitle, storyTitle]
  }

  const periods = splitPeriodToPeriods(selectedPeriod).filter((period) => period !== 'timeline')
  return [timelineTitle]
    .concat(
      periods.map((period, index) => ({
        key: period,
        id: period,
        text: getTitle(period, index, diograph),
        isSelected: selectedPeriod === period,
      }))
    )
    .concat([
      {
        key: 'clear',
        id: null,
        text: 'Clear',
      },
    ])
}
