import { useDispatch, useStore } from '../../../store'
import { selectStory } from '../../navigation/actions'
import { addDioryToHand } from '../actions'

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
