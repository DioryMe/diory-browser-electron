import { useDispatchActions, useStore } from '../../../store'
import { addDioryToHand } from '../actions'
import { setFocus } from '../../navigation/actions'
import { createLink } from '../../diograph/actions'

export const useHand = () => {
  const [{ hand }] = useStore((state) => state.tools)
  const [{ diograph }] = useStore((state) => state.diograph)

  const { dispatch } = useDispatchActions()
  return {
    diorys: diograph && hand.map((id) => diograph[id]).filter(Boolean),
    onDrop: ({ id }) => dispatch(addDioryToHand(id)),
    onClick: (id) => dispatch(setFocus({ id })),
    onDropToItem: ({ droppedId, draggedId }) =>
      dispatch(createLink({ id: droppedId }, { id: draggedId })),
  }
}
