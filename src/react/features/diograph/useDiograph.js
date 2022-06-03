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

function idIs(dioryId) {
  return ({ id }) => id === dioryId
}

const useContext = (contexts) => {
  const { backward } = useSelector((state) => state.navigation)

  if (!contexts.length) {
    return undefined
  }

  const previousStoryId = backward.length && backward[0]
  return contexts.find(idIs(previousStoryId)) || contexts[0]
}

const useContexts = () => {
  const { storyId } = useSelector((state) => state.navigation)
  const { diograph = {} } = useSelector((state) => state.diograph)
  const reverseDiograph = useMemo(() => resolveReverseDiograph(diograph), [diograph])

  const contexts = getLinkedDiorys(storyId, reverseDiograph)
  return {
    context: useContext(contexts),
    contexts,
  }
}

export const useDiograph = () => {
  const { story, memories } = useSelector((state) => state.diograph)
  const { memoryId } = useSelector((state) => state.navigation)
  const { diograph = {} } = useSelector((state) => state.diograph)

  const { context, contexts } = useContexts()
  const contextId = context && context.id
  return {
    context,
    contexts,
    story,
    stories: getLinkedDiorys(contextId, diograph),
    memory: diograph[memoryId],
    memories,
  }
}
