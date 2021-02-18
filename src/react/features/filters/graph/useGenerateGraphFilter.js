import { useStore } from '../../../store'
import { useFocus } from '../../diograph/hooks'

import { useFilter } from '../hooks/useFilter'

function getZoomLevels(length) {
  return [...Array(length).keys()]
}

function getLinkedDioryIds({ links } = {}) {
  return links ? Object.values(links).map(({ id }) => id) : []
}

function reduceNextLinkedDioryIds(diograph) {
  return (linkedDioryIds, dioryId) => [...linkedDioryIds, ...getLinkedDioryIds(diograph[dioryId])]
}

function reduceLinkedDioryIds(diograph) {
  return (linkedDioryIds, zoomLevel) =>
    linkedDioryIds.reduce(reduceNextLinkedDioryIds(diograph), linkedDioryIds)
}

const getLinkedDioryIdsFromZoomLevel = (dioryId, zoom, diograph) =>
  getZoomLevels(zoom).reduce(reduceLinkedDioryIds(diograph), [dioryId])

const useLinkedDioryIds = () => {
  const { diory } = useFocus()
  const { zoom } = useFilter('grid')
  const [{ diograph }] = useStore((state) => state.diograph)

  if (!diory) {
    return []
  }
  if (zoom === 0) {
    return [diory.id]
  }
  return getLinkedDioryIdsFromZoomLevel(diory.id, zoom, diograph)
}

export const useGenerateGraphFilter = () => {
  const { active } = useFilter('grid')
  const linkedDioryIds = useLinkedDioryIds()
  return ({ id }) => !active || linkedDioryIds.includes(id)
}
