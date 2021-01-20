import { useMemo } from 'react'

import { useStore } from '../../store'
import { useGraphFilteredDiorys } from './graph/useGraphFilteredDiorys'
import { useMapFilteredDiorys } from './map/useMapFilteredDiorys'

import { reduceIdsToKeys } from '../../utils/reduceIdsToKeys'
import { useDiorys } from '../diograph/hooks'

export const useFilters = () => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const graphDioryIds = useGraphFilteredDiorys()
  const mapDioryIds = useMapFilteredDiorys()

  const dioryIds = useMemo(
    () =>
      (mapDioryIds || graphDioryIds) &&
      Object.keys(diograph)
        .filter((id) => !graphDioryIds || graphDioryIds[id])
        .filter((id) => !mapDioryIds || mapDioryIds[id])
        .map((id) => ({ id }))
        .reduce(reduceIdsToKeys, {}),
    [diograph, graphDioryIds, mapDioryIds]
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
