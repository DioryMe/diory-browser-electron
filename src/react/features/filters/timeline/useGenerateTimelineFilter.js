import { useFilter } from '../hooks/useFilter'

function datesContainDioryDate({ startDate, endDate }, { date }) {
  return !!date && date >= startDate && date <= endDate
}

export const useGenerateTimelineFilter = () => {
  const { active, dates } = useFilter('timeline')
  return (diory) => !active || !dates || datesContainDioryDate(dates, diory)
}
