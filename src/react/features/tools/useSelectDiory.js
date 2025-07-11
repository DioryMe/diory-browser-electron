import { useDispatchActions, useSelector } from '../../store'
import { selectDiory } from './toolsActions'

export const useSelectDiory = () => {
  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()
  return {
    selectDiory: (clickedDiory, isMultiSelect) => {
      if (!!active || isMultiSelect) {
        dispatch(selectDiory(clickedDiory))
      }
    }
  }
}
