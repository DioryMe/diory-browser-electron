import { useMemo } from 'react'
import { useStore } from '../../store'

import { useGraphFilteredDiorys } from './graph/useGraphFilteredDiorys'
import { useMapFilteredDiorys } from './map/useMapFilteredDiorys'
import { useTimelineFilteredDiorys } from './timeline/useTimelineFilteredDiorys'
import { useTextFilteredDiorys } from './text/useTextFilteredDiorys'

import { reduceIdsToKeys } from '../../utils/reduceIdsToKeys'
import { useDiorys } from '../diograph/hooks'

export const useFilters = () => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const graphDioryIds = useGraphFilteredDiorys()
  const mapDioryIds = useMapFilteredDiorys()
  const textDioryIds = useTextFilteredDiorys()
  const timelineDioryIds = useTimelineFilteredDiorys()

  const dioryIds = useMemo(
    () =>
      (mapDioryIds || graphDioryIds || textDioryIds || timelineDioryIds) &&
      Object.keys(diograph)
        .filter((id) => !graphDioryIds || graphDioryIds[id])
        .filter((id) => !mapDioryIds || mapDioryIds[id])
        .filter((id) => !timelineDioryIds || timelineDioryIds[id])
        .filter((id) => !textDioryIds || textDioryIds[id])
        .map((id) => ({ id }))
        .reduce(reduceIdsToKeys, {}),
    [diograph, graphDioryIds, mapDioryIds, textDioryIds, timelineDioryIds]
  )

  const diorys = useDiorys(dioryIds)
  return useMemo(
    () =>
      dioryIds && {
        diorys,
      },
    [dioryIds, diorys]
  )
}
