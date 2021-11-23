import { useDispatchActions, useStore } from '../../../store'
import { addDioryToHand } from '../toolsActions'
import { selectStory } from '../../navigation/navigationActions'
import { createLink } from '../../diograph/diographActions'

export const useHand = () => {
  const [{ hand }] = useStore((state) => state.tools)
  const [{ diograph }] = useStore((state) => state.diograph)

  const { dispatch } = useDispatchActions()
  return {
    diorys: diograph && hand.map((id) => diograph[id]).filter(Boolean),
    onDrop: ({ id }) => dispatch(addDioryToHand(id)),
    onClick: (id) => dispatch(selectStory({ id })),
    onDropToItem: ({ droppedId, draggedId }) =>
      dispatch(createLink({ id: droppedId }, { id: draggedId })),
  }
}
