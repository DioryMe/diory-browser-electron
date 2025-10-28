import { useSelector } from 'react-redux'

import { getDiory } from './getDiory'

export const useGetDiory = () => {
  const { diograph } = useSelector((state) => state.diograph)
  return {
    getDiory: (storyKey) => getDiory(storyKey, diograph),
  }
}

export const useDiory = (key) => {
  const { getDiory } = useGetDiory()
  return getDiory(key)
}

export const useStoryDiory = () => {
  const { storyKey } = useSelector((state) => state.navigation)
  const { getDiory } = useGetDiory()
  return getDiory(storyKey)
}

// {
//    key,
//    diory,
// }
