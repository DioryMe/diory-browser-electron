import { useSelector } from 'react-redux'
import { useDispatchActions } from '../../../store'

import { useSelectedDiories } from '../utils/useSelectedDiories'

import { createLink } from '../../diograph/diographActions'

export const useLinkDiories = () => {
  const { isDiory } = useSelector((state) => state.diograph)
  const { selectedDiories } = useSelectedDiories()

  const { dispatch } = useDispatchActions()
  return ({ diory, draggedDiory }) => {
    if (isDiory) {
      dispatch(createLink(diory, draggedDiory))
      selectedDiories
        .filter(({ id }) => id !== draggedDiory.id)
        .forEach((selectedDiory) => {
          dispatch(createLink(diory, selectedDiory))
        })
    }
  }
}
