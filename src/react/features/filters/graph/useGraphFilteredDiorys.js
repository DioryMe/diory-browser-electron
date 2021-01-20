import { useStore } from '../../../store'
import { useFocus } from '../../diograph/hooks'

import { reduceIdsToKeys } from '../../../utils/reduceIdsToKeys'

function getArray(length) {
  return [...Array(length - 1).keys()]
}

function getLinkIds({ links } = {}) {
  return links ? Object.values(links).reduce(reduceIdsToKeys, {}) : {}
}

function getDioryLinkIds(diograph) {
  return (obj, { id }) => ({
    ...obj,
    ...getLinkIds(diograph[id]),
  })
}

export const useGraphFilteredDiorys = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ grid: isActive }] = useStore((state) => state.filters.active)
  const [{ grid: zoom }] = useStore((state) => state.filters.filters)
  const { diory } = useFocus()
  return (
    !!isActive &&
    !!diory &&
    !!zoom &&
    getArray(zoom).reduce(
      (dioryIds) => Object.values(dioryIds).reduce(getDioryLinkIds(diograph), dioryIds),
      getLinkIds(diory)
    )
  )
}
