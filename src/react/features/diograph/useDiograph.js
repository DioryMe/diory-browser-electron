import { useMemo } from 'react'
import { useSelector } from '../../store'

import { resolveReverseDiograph } from './resolveReverseDiograph'

const getDiorys = (ids = {}, diograph = {}) =>
  Object.entries(ids)
    .map(([key, { id }]) => ({ key, ...diograph[id] }))
    .filter(({ id }) => id)

export const getLinkedDiorys = (id, diograph) => {
  const diory = diograph[id]
  const links = diory && diory.links
  return getDiorys(links, diograph)
}

const useContexts = () => {
  const { contextId, storyId, backward } = useSelector((state) => state.navigation)
  const { diograph = {} } = useSelector((state) => state.diograph)
  const reverseDiograph = useMemo(() => resolveReverseDiograph(diograph), [diograph])
  const contexts = getLinkedDiorys(storyId, reverseDiograph)
  if (!contexts.length) {
    return {
      contexts: [],
    }
  }
  const contextIds = contexts.map(({ id }) => id)
  if (contextIds.includes(contextId)) {
    return {
      context: diograph[contextId],
      contexts,
    }
  }
  const backwardContextId = backward.find((id) => contextIds.includes(id))
  if (backwardContextId) {
    return {
      context: diograph[backwardContextId],
      contexts,
    }
  }
  return {
    context: contexts[0],
    contexts,
  }
}

export const useDiograph = () => {
  const { contextId, storyId, memoryId } = useSelector((state) => state.navigation)
  const { diograph = {} } = useSelector((state) => state.diograph)

  const { context, contexts } = useContexts()
  return {
    context,
    contexts,
    story: diograph[storyId],
    stories: getLinkedDiorys(contextId, diograph),
    memory: diograph[memoryId],
    memories: getLinkedDiorys(storyId, diograph),
  }
}
