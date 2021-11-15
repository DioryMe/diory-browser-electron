import { useDispatch, useStore } from '../../../store'
import { selectStory } from '../../navigation/actions'
import { addDioryToHand } from '../actions'

export const useStoryTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (!active) {
      dispatch(addDioryToHand(clickedDiory.id))
      dispatch(selectStory(clickedDiory))
    }
  }
}
