import { useDispatchActions, useSelector } from '../../../store'
import { addDioryToHand } from '../toolsActions'
import { selectStory } from '../../navigation/navigationActions'

export const useHand = () => {
  // TODO: Not updated on diograph update
  const { hand } = useSelector((state) => state.tools)

  const { dispatch } = useDispatchActions()
  return {
    diorys: hand,
    onDrop: ({ id }) => dispatch(addDioryToHand(id)),
    onClick: ({ diory: { id } }) => dispatch(selectStory({ id })),
  }
}
