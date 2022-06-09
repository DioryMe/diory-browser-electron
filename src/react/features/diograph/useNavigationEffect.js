import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { getStory, getContext } from './diographActions'

export const useGetStory = () => {
  const { storyId } = useSelector((state) => state.navigation)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (storyId) {
      dispatch(getStory(storyId))
    }
  }, [dispatch, storyId])
}

const useContextId = () => {
  const { backward } = useSelector((state) => state.navigation)
  const { contexts } = useSelector((state) => state.diograph)

  if (!contexts.length) {
    return null
  }

  const previousStoryId = backward.length && backward[0]
  return contexts.map(({ id }) => id).find((id) => id === previousStoryId) || contexts[0].id
}

export const useGetContext = () => {
  const { dispatch } = useDispatchActions()
  const contextId = useContextId()

  useEffect(() => {
    dispatch(getContext(contextId))
  }, [dispatch, contextId])
}

export const useNavigationEffect = () => {
  useGetStory()
  useGetContext()
}
