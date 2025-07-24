import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/useSelectDiory'

export const useNavigationActions = () => {
  const { selectStory } = useSelectStory()
  const { selectDiory } = useSelectDiory()
  return {
    onClick: ({ diory }) => {
      selectStory(diory)
      selectDiory(diory)
    },
  }
}
