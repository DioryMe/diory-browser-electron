import { resolveReverseDiograph } from './resolveReverseDiograph'
import { getDiographKey } from './getDiographKey'
import { getDiory } from './getDiory'

const getDiorys = (links, diograph, parentKey) =>
  Object.entries(links || {})
    .map(([, { id }]) => {
      const key = getDiographKey(parentKey, id)
      return getDiory(key, diograph || {})
    })
    .filter(({ id }) => id)

const getLinkedDiorys = (parentDiory = {}, diograph) => {
  const diory = getDiory(parentDiory.key, diograph)
  const links = diory && diory.links
  return getDiorys(links, diograph, parentDiory.key)
}

const useContexts = (contextKey, story, backward, diograph) => {
  const reverseDiograph = resolveReverseDiograph(diograph)
  const contexts = getLinkedDiorys(story, reverseDiograph)
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

export const useDiographData = (navigationState = {}, diograph = {}) => {
  const { storyKey, contextKey, memoryKey, backward = [] } = navigationState

  const story = getDiory(storyKey, diograph)
  const { context, contexts } = useContexts(contextKey, story, backward, diograph)

  return {
    diograph,
    context,
    contexts,
    story,
    stories: getLinkedDiorys(context, diograph),
    memory: getDiory(memoryKey, diograph),
    memories: getLinkedDiorys(story, diograph),
  }
}
