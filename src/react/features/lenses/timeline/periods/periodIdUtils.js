import { findImage } from '../../../diograph/utils/dioryUtils'
import { useSelector } from 'react-redux'
import { getDiographKey } from '../../../diograph/utils/diographUtils'

export const isPeriodId = (periodId) => {
  const date = new Date(periodId)
  return !Number.isNaN(date.valueOf())
}

export const isNotPeriodId = (periodId) => !isPeriodId(periodId)

export const splitDateToPeriodIds = (date) => {
  if (!date || date === 'timeline') return []

  const [day] = date.split('T')
  return day.split('-').map((_, index, part) => part.slice(0, index + 1).join('-'))
}

export const startsWithPeriodId =
  (periodId) =>
  ({ date }) =>
    date && date.startsWith(periodId)

export const isYearPeriodId = (periodId) => periodId.length === 4

export const isDayPeriodId = (periodId) => {
  const [date] = periodId.split('T')
  return date.split('-').length === 3
}

export const findPeriodImage = (periodId, diories = []) =>
  findImage(diories.filter(startsWithPeriodId(periodId)))

export const useSelectedPeriodKey = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { address } = useSelector((state) => state.diograph)
  return getDiographKey(address, selectedPeriod)
}
