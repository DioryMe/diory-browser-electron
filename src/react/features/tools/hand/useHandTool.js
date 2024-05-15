import { useDispatchActions, useSelector } from '../../../store'
import { addDioryToHand, clearHand } from '../toolsActions'
import { selectStory } from '../../navigation/navigationActions'

export const useHandTool = () => {
  const { hand } = useSelector((state) => state.tools)
  const { dispatch } = useDispatchActions()
  return {
    diorys: hand,
    onDrop: ({ draggedDiory }) => dispatch(addDioryToHand(draggedDiory)),
    onClick: ({ diory: { id } }) => dispatch(selectStory({ id })),
    onClear: () => dispatch(clearHand()),
  }
}
