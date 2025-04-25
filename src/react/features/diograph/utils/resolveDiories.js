import { getDiory } from './getDiory'
import { getLinkedDiories } from './getLinkedDiories'

export const resolveDiories = (navigationState = {}, diograph = {}) => {
  const { storyKey, memoryKey } = navigationState

  const story = getDiory(storyKey, diograph)
  return {
    story,
    memory: getDiory(memoryKey, diograph),
    memories: getLinkedDiories(story, diograph),
  }
}
