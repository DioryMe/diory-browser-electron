import { useMemo } from 'react'
import { useStore } from '../../store'

import { useFiltersAreActive } from './hooks/useFiltersAreActive'

import { useGraphFilter } from './graph/useGraphFilter'
import { useMapFilter } from './map/useMapFilter'
import { useTimelineFilter } from './timeline/useTimelineFilter'
import { useTextFilter } from './text/useTextFilter'

import { reduceIdsToKeys } from '../../utils/reduceIdsToKeys'
import { useDiorys } from '../diograph/hooks'

export const useFilteredDiorys = () => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const filtersAreActive = useFiltersAreActive()

  const { graphFilter } = useGraphFilter()
  const { mapFilter } = useMapFilter()
  const { timelineFilter } = useTimelineFilter()
  const { textFilter } = useTextFilter()

  const dioryIds = useMemo(
    () =>
      Object.values(diograph || {})
        .filter(graphFilter)
        .filter(mapFilter)
        .filter(timelineFilter)
        .filter(textFilter)
        .reduce(reduceIdsToKeys, {}),
    [diograph, graphFilter, mapFilter, timelineFilter, textFilter]
  )

  const diorys = useDiorys(dioryIds)
  return useMemo(
    () =>
      filtersAreActive && {
        diorys,
      },
    [filtersAreActive, diorys]
  )
}
