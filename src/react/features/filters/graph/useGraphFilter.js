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
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ grid: isActive }] = useStore((state) => state.filters.active)
  const [{ grid: zoomLevel }] = useStore((state) => state.filters.filters)

  const diory = diograph[focus]
  return (
    isActive &&
    !!zoomLevel &&
    !!diory &&
    getArray(zoomLevel).reduce(
      (dioryIds) => Object.values(dioryIds).reduce(getDioryLinkIds(diograph), dioryIds),
      getLinkIds(diory)
    )
  )
}
