export const splitDateToPeriods = (date) => {
  if (!date) return []

  const [day] = date.split('T')
  return day.split('-').map((_, index, part) => part.slice(0, index + 1).join('-'))
}
