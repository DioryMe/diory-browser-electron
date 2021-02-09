import { useStore } from '../../../store'

import { reduceIdsToKeys } from '../../../utils/reduceIdsToKeys'

export const useTimelineFilteredDiorys = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ timeline: isActive }] = useStore((state) => state.filters.active)
  const [{ timeline: dates }] = useStore((state) => state.filters.filters)

  return (
    !!isActive &&
    !!dates &&
    Object.values(diograph)
      .filter(({ date }) => date)
      .filter(({ date }) => date > dates.startDate && date < dates.endDate)
      .map(({ id }) => ({ id }))
      .reduce(reduceIdsToKeys, {})
  )
}
