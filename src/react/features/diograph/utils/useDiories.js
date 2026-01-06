import { useSelector } from 'react-redux'

import { getDiory } from './useGetDioryById'
import { getLinkedDiories } from './getLinkedDiories'

export const getStoryDiories = (storyKey, diograph = {}) => {
  const story = getDiory(storyKey, diograph)
  return {
    story,
    memories: getLinkedDiories(storyKey, diograph),
  }
}

export const useGetDiories = () => {
  const { diograph } = useSelector((state) => state.diograph)
  return {
    getDiories: (storyKey) => getStoryDiories(storyKey, diograph),
  }
}

export const useDiories = (storyKey) => {
  const { getDiories } = useGetDiories()
  return getDiories(storyKey)
}

export const useStoryDiories = () => {
  const { storyKey } = useSelector((state) => state.navigation)
  const { getDiories } = useGetDiories()
  return getDiories(storyKey)
}

// {
//    key,
//    diory,
// }
