import { useDispatchActions } from '../../../store'

import { useSelectedDiories } from '../utils/useSelectedDiories'

import { createLink } from '../../diograph/diographActions'

export const useLinkDiories = () => {
  const { selectedDiories } = useSelectedDiories()

  const { dispatch } = useDispatchActions()
  return ({ diory, draggedDiory }) => {
    dispatch(createLink(diory, draggedDiory))
    selectedDiories
      .filter(({ id }) => id !== draggedDiory.id)
      .forEach((selectedDiory) => {
        dispatch(createLink(diory, selectedDiory))
      })
  }
}
