import { isYearPeriodId } from '../utils/periodIdUtils'

const arrayRange = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step)

const isFirst = (index) => index === 0
const isLast = (index, array) => index === array.length - 1
const twoDigits = (number) => String(number).padStart(2, '0')
const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

const formatYears = (startTime, endTime) => {
  const minYear = new Date(startTime).getFullYear()
  const maxYear = new Date(endTime).getFullYear()
  return arrayRange(minYear, maxYear).map((number) => number.toString())
}

const formatMonth = (year) => (month) => `${year}-${twoDigits(month)}`

const formatMonths = (startTime, endTime) =>
  formatYears(startTime, endTime)
    .map((year, index, array) => {
      const minMonth = isFirst(index) ? new Date(startTime).getMonth() + 1 : 1
      const maxMonth = isLast(index, array) ? new Date(endTime).getMonth() + 1 : 12

      return arrayRange(minMonth, maxMonth).map(formatMonth(year))
    })
    .flat()

const formatDay = (yearMonth) => (day) => `${yearMonth}-${twoDigits(day)}`

const formatDays = (startTime, endTime) =>
  formatMonths(startTime, endTime)
    .map((yearMonth, index, array) => {
      const minDay = isFirst(index) ? new Date(startTime).getDate() : 1
      const maxDay = isLast(index, array)
        ? new Date(endTime).getDate()
        : daysInMonth(...yearMonth.split('-'))

      return arrayRange(minDay, maxDay).map(formatDay(yearMonth))
    })
    .flat()

export const resolveChildPeriodIds = (selectedPeriod, startTime, endTime) => {
  if (selectedPeriod === 'timeline') {
    return formatYears(startTime, endTime)
  }

  if (isYearPeriodId(selectedPeriod)) {
    return formatMonths(startTime, endTime)
  }

  return formatDays(startTime, endTime)
}
