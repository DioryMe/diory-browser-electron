import { useDispatchActions, useStore } from '../../../store'
import { addDioryToHand } from '../actions'

export const useHand = () => {
  const [{ hand }] = useStore((state) => state.tools)
  const [{ diograph }] = useStore((state) => state.diograph)

  const { dispatch } = useDispatchActions()
  return {
    diorys: hand.map((id) => diograph[id]).filter(Boolean),
    onDrop: ({ id }) => dispatch(addDioryToHand(id)),
  }
}
