import { useDispatchActions, useSelector } from '../../../store'
import { addDioryToHand } from '../toolsActions'
import { selectStory } from '../../navigation/navigationActions'

export const useHand = () => {
  const { hand } = useSelector((state) => state.tools)
  const { diograph } = useSelector((state) => state.diograph)

  const { dispatch } = useDispatchActions()
  return {
    diorys: diograph && hand.map((id) => diograph[id]).filter(Boolean),
    onDrop: ({ id }) => dispatch(addDioryToHand(id)),
    onClick: ({ diory: { id } }) => dispatch(selectStory({ id })),
  }
}
