import { getDiory } from './getDiory'
import { getLinkedDiories } from './getLinkedDiories'

export const resolveContext = (storyKey, backward, diograph, reverseDiograph) => {
  const contexts = getLinkedDiories(storyKey, reverseDiograph).filter(({ key }) => key !== storyKey)
  if (!contexts.length) {
    return {
      contexts: [],
    }
  }

  const contextKeys = contexts.map(({ key }) => key)
  const backwardContextKey = (backward || []).find((backwardKey) =>
    contextKeys.includes(backwardKey)
  )
  if (backwardContextKey) {
    return {
      context: getDiory(backwardContextKey, diograph),
      contexts,
    }
  }

  return {
    context: contexts[0],
    contexts,
  }
}
