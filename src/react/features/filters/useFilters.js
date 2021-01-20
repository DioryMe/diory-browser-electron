import { useMemo } from 'react'

import { useStore } from '../../store'
import { useGraphFilteredDiorys } from './graph/useGraphFilteredDiorys'
import { useMapFilteredDiorys } from './map/useMapFilteredDiorys'
import { useTextFilteredDiorys } from './text/useTextFilteredDiorys'

import { reduceIdsToKeys } from '../../utils/reduceIdsToKeys'
import { useDiorys } from '../diograph/hooks'

export const useFilters = () => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const graphDioryIds = useGraphFilteredDiorys()
  const mapDioryIds = useMapFilteredDiorys()
  const textDioryIds = useTextFilteredDiorys()

  const dioryIds = useMemo(
    () =>
      (mapDioryIds || graphDioryIds || textDioryIds) &&
      Object.keys(diograph)
        .filter((id) => !graphDioryIds || graphDioryIds[id])
        .filter((id) => !mapDioryIds || mapDioryIds[id])
        .filter((id) => !textDioryIds || textDioryIds[id])
        .map((id) => ({ id }))
        .reduce(reduceIdsToKeys, {}),
    [diograph, graphDioryIds, mapDioryIds, textDioryIds]
  )

  const diorys = useDiorys(dioryIds)
  return useMemo(
    () =>
      dioryIds && {
        diory: { id: 'filter', text: 'Filter' },
        diorys,
      },
    [dioryIds]
  )
}
