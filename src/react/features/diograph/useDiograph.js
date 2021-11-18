import { useMemo } from 'react'
import { useStore } from '../../store'
import { useDiorys } from './useDiorys'

import { resolveReverseDiograph } from './resolveReverseDiograph'

const useLinkedDiorys = (id, diograph) => {
  const diory = diograph[id]
  const links = diory && diory.links
  return useDiorys(links)
}

function idIs(contextId) {
  return ({ id }) => id === contextId
}

const useContext = (contexts) => {
  const [{ contextId, backward }] = useStore((state) => state.navigation)

  if (!contexts.length) {
    return undefined
  }

  const previousStoryId = backward.length && backward[0][1]
  return contexts.find(idIs(contextId)) || contexts.find(idIs(previousStoryId)) || contexts[0]
}

const useContexts = () => {
  const [{ storyId }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  const reverseDiograph = useMemo(() => resolveReverseDiograph(diograph), [diograph])

  const contexts = useLinkedDiorys(storyId, reverseDiograph)
  return {
    context: useContext(contexts),
    contexts,
  }
}

export const useDiograph = () => {
  const [{ storyId, memoryId }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)

  const { context, contexts } = useContexts()
  const contextId = context && context.id
  return {
    context,
    contexts,
    story: diograph[storyId],
    stories: useLinkedDiorys(contextId, diograph),
    memory: diograph[memoryId],
    memories: useLinkedDiorys(storyId, diograph),
  }
}
