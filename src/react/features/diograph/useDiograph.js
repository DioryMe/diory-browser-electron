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
  const { storyId } = useSelector((state) => state.navigation)
  const { diograph = {} } = useSelector((state) => state.diograph)
  const reverseDiograph = useMemo(() => resolveReverseDiograph(diograph), [diograph])

  const contexts = getLinkedDiorys(storyId, reverseDiograph)
  return {
    contexts,
  }
}

export const useDiograph = () => {
  const { contextId, storyId, memoryId } = useSelector((state) => state.navigation)
  const { diograph = {} } = useSelector((state) => state.diograph)

  const { contexts } = useContexts()
  return {
    context: diograph[contextId],
    contexts,
    story: diograph[storyId],
    stories: getLinkedDiorys(contextId, diograph),
    memory: diograph[memoryId],
    memories: getLinkedDiorys(storyId, diograph),
  }
}
