import { useSelector } from 'react-redux'
import { useStoryDiories } from '../../../diograph/utils/useDiories'

import { resolveDatesDiograph } from './resolveDatesDiograph'
import { getDatesDiograph } from './getDatesDiograph'
import { unique } from '../../../../utils/unique'
import { startsWithPeriod } from './startsWithPeriod'

// const getNextPeriod =
//   (selectedPeriod) =>
//   ({ date }) => {
//     const [day, time] = date.split('T')
//     const nextPeriod = day
//       .split('-')
//       .slice(0, selectedPeriod.split('-').length + 1)
//       .join('-')
//     return selectedPeriod.split('-').length === 3
//       ? `${selectedPeriod}T${time.slice(0, 2)}`
//       : nextPeriod
//   }

const isDayPeriod = (period) => {
  const [date] = period.split('T')
  return date.split('-').length === 3
}

const addAmount = (memories, diograph) => (period) => {
  const amount = memories.filter(startsWithPeriod(period.id)).length
  const totalAmount = Object.values(diograph).filter(startsWithPeriod(period.id)).length
  return {
    ...period,
    amount: `${amount} / ${totalAmount}`,
  }
}

// TODO image to all periods (story, memory, other)
// TODO indicate story period (same as map)
// TODO clear selection on story change
export const useTimePeriods = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses) // 2021
  const { diograph } = useSelector((state) => state.diograph)
  const { story, memories } = useStoryDiories()
  const diories = [story].concat(memories)

  if (selectedPeriod === 'timeline') {
    const years = Object.values(diograph)
      .filter(({ date }) => date)
      .map(({ date }) => date.slice(0, 4))
      .filter(unique)
    return Object.values(getDatesDiograph(years, diograph)).map(addAmount(diories, diograph))
  }

  if (selectedPeriod) {
    if (isDayPeriod(selectedPeriod)) {
      return []
    }

    const selectedDiories = Object.values(diograph).filter(startsWithPeriod(selectedPeriod))

    return Object.values(resolveDatesDiograph(selectedDiories)).map(addAmount(diories, diograph))
  }

  return Object.values(resolveDatesDiograph(diories)).map(addAmount(diories, diograph))
}
