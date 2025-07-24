import { getDiory } from './getDiory'
import { resolveLinkKey } from './resolveLinkKey'

export const getLinkedDiories = (dioryKey, diograph) => {
  if (!dioryKey) return []

  const diory = getDiory(dioryKey, diograph)
  const links = diory && diory.links
  return Object.entries(links || {}).map(([, { id }]) => {
    const key = resolveLinkKey(dioryKey, id)
    return getDiory(key, diograph || {})
  }).filter(Boolean)
}
