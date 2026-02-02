import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { resolveReverseDiograph } from './resolveReverseDiograph'
import { getLinkedDiories } from './getLinkedDiories'
import { getDiory } from './getDiory'

const resolveContext = (storyKey, backward, diograph, reverseDiograph) => {
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

export const useGetContextDiories = (diograph) => {
  const reverseDiograph = useMemo(() => resolveReverseDiograph(diograph), [Object.keys(diograph)])
  return {
    getContextDiories: (storyKey, backward) => {
      const { context, contexts } = resolveContext(storyKey, backward, diograph, reverseDiograph)
      return {
        context,
        contexts,
        stories: context ? getLinkedDiories(context.key, diograph) : [],
      }
    },
  }
}

export const useContextDiories = (storyKey, backward, diograph) => {
  const { getContextDiories } = useGetContextDiories(diograph)
  return getContextDiories(storyKey, backward)
}

export const useStoryContextDiories = (diograph) => {
  const { storyKey, backward } = useSelector((state) => state.navigation)
  return useContextDiories(storyKey, backward, diograph)
}
