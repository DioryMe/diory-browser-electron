import { getDiory } from './useGetDioryById'
import { resolveDiographKey } from './diographUtils'

export const getLinkedDiories = (dioryKey, diograph) => {
  if (!dioryKey) return []

  const diory = getDiory(dioryKey, diograph)
  const links = diory && diory.links
  return Object.entries(links || {})
    .map(([, { id }]) => {
      const [linkKey] = Object.entries(diograph).find(([, { id: dioryId }]) => dioryId === id) || [
        id,
      ]
      const diographKey = resolveDiographKey(dioryKey, linkKey)
      return getDiory(diographKey, diograph || {})
    })
    .filter(Boolean)
}
