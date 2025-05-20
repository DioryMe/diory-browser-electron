import { useSelector } from 'react-redux'
import { useDiories } from '../../../diograph/utils/useDiories'

import { resolveDatesDiograph } from './resolveDatesDiograph'
import { getDatesDiograph } from './getDatesDiograph'
import { unique } from '../../../../utils/unique'
import { startsWithPeriod } from './startsWithPeriod'

const getNextPeriod =
  (selectedPeriod) =>
  ({ date }) => {
    const [day, time] = date.split('T')
    const nextPeriod = day
      .split('-')
      .slice(0, selectedPeriod.split('-').length + 1)
      .join('-')
    return selectedPeriod.split('-').length === 3
      ? `${selectedPeriod}T${time.slice(0, 2)}`
      : nextPeriod
  }

const lessThanHour = (period) => {
  const [, time] = period.split('T')
  return time && time.length >= 2
}

export const useTimePeriods = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses) // 2021
  const { diograph } = useSelector((state) => state.diograph)
  const { memories } = useDiories()

  if (selectedPeriod === 'timeline') {
    const years = Object.values(diograph)
      .filter(({ date }) => date)
      .map(({ date }) => date.slice(0, 4))
      .filter(unique)
    return Object.values(getDatesDiograph(years, diograph)) // .map(mapToPeriod)
  }

  if (selectedPeriod) {
    if (lessThanHour(selectedPeriod)) {
      return []
    }

    const selectedDates = Object.values(diograph)
      .filter((diory) => startsWithPeriod(diory, selectedPeriod))
      .map(getNextPeriod(selectedPeriod))
      .filter(unique)

    return Object.values(getDatesDiograph(selectedDates, diograph)) // .map(mapToPeriod)
  }

  return Object.values(resolveDatesDiograph(memories, diograph)) // .map(mapToPeriod)
}
