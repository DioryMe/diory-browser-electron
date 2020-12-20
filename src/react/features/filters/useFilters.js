import { useStore } from '../../store'
import { reduceIdsToKeys } from '../../utils/reduceIdsToKeys'
import { getDiorys } from '../diograph/hooks'
import { useGraphFilter } from './graph/useGraphFilter'

export const useFilters = () => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const graphDioryIds = useGraphFilter()

  return Object.keys(diograph)
    .filter((id) => !graphDioryIds || graphDioryIds[id])
    .map((id) => ({ id }))
    .reduce(reduceIdsToKeys, {})
}

export const useFilteredDiorys = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const dioryIds = useFilters()
  return getDiorys(dioryIds, diograph)
}
