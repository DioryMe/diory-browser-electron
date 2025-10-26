import { useDispatchActions } from '../../store'
import { selectDiory } from './toolsActions'

export const useSelectDiory = () => {
  const { dispatch } = useDispatchActions()
  return ({ diory }) => {
    dispatch(selectDiory(diory))
  }
}
