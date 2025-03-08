import { resolveReverseDiograph } from './resolveReverseDiograph'
import { getDiosphereAddress } from './getDiosphereAddress'
import { getDiory } from './getDiory'

const getDiorys = (links, diograph, parentAddress) =>
  Object.entries(links || {})
    .map(([, { id }]) => {
      const address = getDiosphereAddress(parentAddress, id)
      return getDiory(address, diograph || {})
    })
    .filter(({ id }) => id)

const getLinkedDiorys = (diosphereAddress, diograph) => {
  const diory = getDiory(diosphereAddress, diograph)
  const links = diory && diory.links
  return getDiorys(links, diograph, diosphereAddress)
}

const useContexts = (contextAddress, storyAddress, backward, diograph) => {
  const reverseDiograph = resolveReverseDiograph(diograph)
  const contexts = getLinkedDiorys(storyAddress, reverseDiograph)
  if (!contexts.length) {
    return {
      contexts: [],
    }
  }
  const contextAddresses = contexts.map(({ address }) => address)
  if (contextAddresses.includes(contextAddress)) {
    return {
      context: getDiory(contextAddress, diograph),
      contexts,
    }
  }
  const backwardContextAddress = backward.find((id) => contextAddresses.includes(id))
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
  const { storyId, contextId, memoryId, backward = [] } = navigationState
  const { context, contexts } = useContexts(contextId, storyId, backward, diograph)

  return {
    diograph,
    context,
    contexts,
    story: getDiory(storyId, diograph),
    stories: getLinkedDiorys(contextId, diograph),
    memory: getDiory(memoryId, diograph),
    memories: getLinkedDiorys(storyId, diograph),
  }
}
