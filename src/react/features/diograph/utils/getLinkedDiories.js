import { getDiory } from './getDiory'
import { getDiories } from './getDiories'

export const getLinkedDiories = (parentDiory = {}, diograph) => {
  const diory = getDiory(parentDiory.key, diograph)
  const links = diory && diory.links
  return getDiories(links, diograph, parentDiory.key)
}
