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

const getLinkedDiorys = (key, diograph) => {
  const diory = getDiory(key, diograph)
  const links = diory && diory.links
  return getDiorys(links, diograph, key)
}

const useContexts = (contextKey, storyKey, backward, diograph) => {
  const reverseDiograph = resolveReverseDiograph(diograph)
  const contexts = getLinkedDiorys(storyKey, reverseDiograph)
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
  const { context, contexts } = useContexts(contextKey, storyKey, backward, diograph)

  return {
    diograph,
    context,
    contexts,
    story: getDiory(storyKey, diograph),
    stories: getLinkedDiorys(contextKey, diograph),
    memory: getDiory(memoryKey, diograph),
    memories: getLinkedDiorys(storyKey, diograph),
  }
}
