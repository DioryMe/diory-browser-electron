import { useDispatchActions, useSelector } from '../../../store'
import { selectStory } from '../../navigation/navigationActions'
import { addDioryToHand } from '../toolsActions'

export const useStoryTool = () => {
  const { active, activeButton } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  return (clickedDiory) => {
    if (!active || activeButton.data.enableDioryClick) {
      dispatch(addDioryToHand(clickedDiory.id))
      dispatch(selectStory(clickedDiory))
    }
  }
}
