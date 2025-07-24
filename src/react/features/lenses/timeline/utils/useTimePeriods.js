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

const mapToPeriod = ({ id, text, links, image }) => ({
  id,
  label: text,
  amount: links.length,
  image,
})

const addTotalAmount =
  (diograph) =>
  ({ amount, ...period }) => {
    const totalAmount = Object.values(diograph).filter(startsWithPeriod(period.id)).length
    return {
      ...period,
      amount: `${amount} / ${totalAmount}`,
    }
  }

export const useTimePeriods = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses) // 2021
  const { diograph } = useSelector((state) => state.diograph)
  const { memories } = useStoryDiories()

  if (selectedPeriod === 'timeline') {
    const years = Object.values(diograph)
      .filter(({ date }) => date)
      .map(({ date }) => date.slice(0, 4))
      .filter(unique)
    return Object.values(getDatesDiograph(years, diograph)).map(mapToPeriod)
  }

  if (selectedPeriod) {
    if (isDayPeriod(selectedPeriod)) {
      return []
    }

    const selectedDiories = Object.values(diograph).filter(startsWithPeriod(selectedPeriod))

    return Object.values(resolveDatesDiograph(selectedDiories)).map(mapToPeriod)
  }

  return Object.values(resolveDatesDiograph(memories))
    .map(mapToPeriod)
    .map(addTotalAmount(diograph))
}
