import { useSelector } from 'react-redux'

import { useSelectedDiories } from '../../tools/useSelectedDiories'

import { getDiory } from './getDiory'
import { getLinkedDiories } from './getLinkedDiories'

const isSelected = (dioryKey, selectedDiories = []) =>
  selectedDiories.some(({ key }) => key === dioryKey)

export const getStoryDiories = (storyKey, diograph = {}, selectedDiories = []) => {
  const story = getDiory(storyKey, diograph)
  return {
    story: { ...story, selected: isSelected(storyKey, selectedDiories) },
    memories: getLinkedDiories(storyKey, diograph).map((diory) => ({
      ...diory,
      selected: isSelected(storyKey, selectedDiories),
    })),
  }
}

export const useGetDiories = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedDiories } = useSelectedDiories()
  return {
    getDiories: (storyKey) => getStoryDiories(storyKey, diograph, selectedDiories),
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
//    selected,
// }
