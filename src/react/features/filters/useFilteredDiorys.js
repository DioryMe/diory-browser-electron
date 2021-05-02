import { useMemo } from 'react'
import { useStore } from '../../store'

import { useGraphFilter } from './graph/useGraphFilter'
import { useMapFilter } from './map/useMapFilter'
import { useTimelineFilter } from './timeline/useTimelineFilter'
import { useTextFilter } from './text/useTextFilter'
import { useDiorys } from '../diograph/hooks'

import { reduceIdsToKeys } from '../../utils/reduceIdsToKeys'

export const useFilteredDiorys = () => {
  const [{ diograph }] = useStore((state) => state.diograph)

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
    () => ({
      diory: diorys[0],
      diorys,
    }),
    [diorys]
  )
}
