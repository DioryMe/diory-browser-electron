import { useDispatchActions } from '../../../store'
import { selectDiory } from '../toolsActions'
import { useTakeToDiory } from '../actions/takeToDiory/useTakeToDiory'

export const useOnSelectDiory = () => {
  const { dispatch } = useDispatchActions()
  const takeToDiory = useTakeToDiory()

  return ({ diory }) => {
    dispatch(selectDiory(diory))
    takeToDiory({ diory })
    // Delete
    // Link
    // ...
  }
}
