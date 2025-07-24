import { getDiory } from './getDiory'
import { getDiographKey } from './getDiographKey'

export const getLinkedDiories = (dioryKey, diograph) => {
  if (!dioryKey) return []

  const diory = getDiory(dioryKey, diograph)
  const links = diory && diory.links
  return Object.entries(links || {})
    .map(([, { id }]) => {
      const key = getDiographKey(dioryKey, id)
      return getDiory(key, diograph || {})
    })
}

