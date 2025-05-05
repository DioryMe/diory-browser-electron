import { resolveReverseDiograph } from './resolveReverseDiograph'
import { getDiory } from './getDiory'
import { getLinkedDiories } from './getLinkedDiories'

const resolveContext = (contextKey, story, backward, diograph) => {
  const reverseDiograph = resolveReverseDiograph(diograph)
  const contexts = getLinkedDiories(story, reverseDiograph).filter(({ key }) => key !== story.key)
  if (!contexts.length) {
    return {
      contexts: [],
    }
  }
  const contextAddresses = contexts.map(({ key }) => key)
  if (contextAddresses.includes(contextKey)) {
    return {
      context: getDiory(contextKey, diograph),
      contexts,
    }
  }
  const backwardContextAddress = backward.find((address) =>
    contextAddresses.includes(getDiory(address, diograph).key)
  )
  if (backwardContextAddress) {
    return {
      context: getDiory(backwardContextAddress, diograph),
      contexts,
    }
  }
  return {
    context: contexts[0],
    contexts,
  }
}

export const resolveContextDiories = (navigationState = {}, diograph = {}) => {
  const { storyKey, contextKey, backward = [] } = navigationState

  const story = getDiory(storyKey, diograph)
  const { context, contexts } = resolveContext(contextKey, story, backward, diograph)

  return {
    context,
    contexts,
    stories: getLinkedDiories(context, diograph),
  }
}
