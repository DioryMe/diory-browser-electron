import { useStore } from '../../../store'
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

export const useGraphFilter = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ grid: isActive }] = useStore((state) => state.filters.active)
  const [{ grid: filter }] = useStore((state) => state.filters.filters)

  const { focus, zoom } = filter || {}
  const diory = diograph[focus]
  return (
    isActive &&
    !!filter &&
    !!diory &&
    getArray(zoom).reduce(
      (dioryIds) => Object.values(dioryIds).reduce(getDioryLinkIds(diograph), dioryIds),
      getLinkIds(diory)
    )
  )
}
