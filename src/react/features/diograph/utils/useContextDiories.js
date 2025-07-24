import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '../../navigation/useNavigation'

import { resolveReverseDiograph } from './resolveReverseDiograph'
import { getLinkedDiories } from './getLinkedDiories'
import { resolveContext } from './resolveContext'

export const useGetContextDiories = () => {
  const { diograph } = useSelector((state) => state.diograph)
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

export const useContextDiories = (storyKey, backward) => {
  const { getContextDiories } = useGetContextDiories()
  return getContextDiories(storyKey, backward)
}

export const useStoryContextDiories = () => {
  const { storyKey, backward } = useNavigation()
  return useContextDiories(storyKey, backward)
}
