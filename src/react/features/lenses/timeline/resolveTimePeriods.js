const HOURS = 60 * 60 * 1000
const DAYS = 24 * HOURS
const MONTHS = 29 * DAYS
const YEARS = 365 * DAYS

const arrayRange = (start, stop, step = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

const isFirst = (index) => index === 0
const isLast = (index, array) => index === (array.length - 1)
const twoDigits = (number) => String(number).padStart(2, '0')
const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

const formatYears = (minDate, maxDate) => {
  const minYear = new Date(minDate).getFullYear()
  const maxYear = new Date(maxDate).getFullYear()
  return arrayRange(minYear, maxYear).map((number) => number.toString())
}

const formatMonth = (year) => (month) => `${year}-${twoDigits(month)}`

const formatMonths = (minDate, maxDate) =>
  formatYears(minDate, maxDate).map((year, index, array) => {
    const minMonth = isFirst(index) ? new Date(minDate).getMonth() + 1 : 1
    const maxMonth = isLast(index, array) ? new Date(maxDate).getMonth() + 1: 12

    return arrayRange(minMonth, maxMonth).map(formatMonth(year))
  }).flat()

const formatDay = (yearMonth) => (day) => `${yearMonth}-${twoDigits(day)}`

const formatDays = (minDate, maxDate) =>
  formatMonths(minDate, maxDate).map((yearMonth, index, array) => {
    const minDay = isFirst(index) ? new Date(minDate).getDate() : 1
    const maxDay = isLast(index, array) ? new Date(maxDate).getDate() : daysInMonth(...yearMonth.split('-'))

    return arrayRange(minDay, maxDay).map(formatDay(yearMonth))
  }).flat()

const formatHour = (yearMonthDay) => (hour) => `${yearMonthDay}T${twoDigits(hour)}`

const formatHours = (minDate, maxDate) => {
  return formatDays(minDate, maxDate).map((yearMonthDay, index, array) => {
    const minHour = isFirst(index) ? new Date(minDate).getUTCHours() : 0
    const maxHour = isLast(index, array) ? new Date(maxDate).getUTCHours() : 23

    return arrayRange(minHour, maxHour).map(formatHour(yearMonthDay))
  }).flat()
}

export const resolveTimePeriods = (minDate, maxDate) => {
  const timeDifference = maxDate - minDate

  if (timeDifference > 4 * YEARS) { // 36 months
    return formatYears(minDate, maxDate)
  }

  if (timeDifference > 2 * MONTHS) { // 60 days
    return formatMonths(minDate, maxDate)
  }

  if (timeDifference > 3 * DAYS) { // 72 hours
    return formatDays(minDate, maxDate)
  }

  return formatHours(minDate, maxDate)
}
