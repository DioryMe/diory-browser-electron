import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { getStory } from './diographActions'

export const useSelectedStoryEffect = () => {
  const { storyId } = useSelector((state) => state.navigation)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (storyId) {
      dispatch(getStory(storyId))
    }
  }, [dispatch, storyId])
}
