import { getDiory } from './getDiory'
import { getLinkedDiories } from './getLinkedDiories'

export const getStoryDiories = (storyKey = '/', diograph = {}) => ({
  story: getDiory(storyKey, diograph),
  memories: getLinkedDiories(storyKey, diograph),
})

// {
//    key,
//    diory,
// }
