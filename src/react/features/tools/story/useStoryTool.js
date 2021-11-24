import { useDispatch, useStore } from '../../../store'
import { selectStory } from '../../navigation/navigationActions'
import { addDioryToHand } from '../toolsActions'

export const useStoryTool = () => {
  const [{ active, activeButton }] = useStore((state) => state.buttons)

  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (!active || activeButton.data.enableDioryClick) {
      dispatch(addDioryToHand(clickedDiory.id))
      dispatch(selectStory(clickedDiory))
    }
  }
}
