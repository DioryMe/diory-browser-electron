import { getDiory } from './getDiory'
import { resolveDiographKey } from './diographUtils'

export const getLinkedDiories = (dioryKey, diograph) => {
  if (!dioryKey) return []

  const diory = getDiory(dioryKey, diograph)
  const links = diory && diory.links
  return Object.entries(links || {})
    .map(([, { id }]) => {
      const diographKey = resolveDiographKey(dioryKey, id)
      return getDiory(diographKey, diograph || {})
    })
    .filter(Boolean)
}
