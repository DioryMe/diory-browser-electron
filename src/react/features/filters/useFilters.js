import React, { useMemo } from 'react'

import { useStore } from '../../store'
import { useGraphFilter } from './graph/useGraphFilter'
import { useMapFilter } from './map/useMapFilter'

import { reduceIdsToKeys } from '../../utils/reduceIdsToKeys'
import { useDiorys } from '../diograph/hooks'

export const useFilters = () => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const graphDioryIds = useGraphFilter()
  const mapDioryIds = useMapFilter()

  const dioryIds = useMemo(() => ((mapDioryIds || graphDioryIds) &&
    Object.keys(diograph)
    .filter((id) => !graphDioryIds || graphDioryIds[id])
    .filter((id) => !mapDioryIds || mapDioryIds[id])
    .map((id) => ({ id }))
    .reduce(reduceIdsToKeys,{})
  ), [diograph, graphDioryIds, mapDioryIds])

  const diorys = useDiorys(dioryIds)
  return dioryIds && {
    diory: { id: 'filter', text: 'Filter' },
    diorys,
  }
}