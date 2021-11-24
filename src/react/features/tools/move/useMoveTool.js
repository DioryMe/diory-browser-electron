import { useDispatch } from '../../../store'
import { useButtons } from '../../buttons/useButtons'
import { useMoveToolIsActive } from './useMoveToolIsActive'

import { inactivateButton } from '../../buttons/buttonsActions'
import { updateDiory } from '../../diograph/diographActions'

import { buttons } from './buttons'

export const useMoveTool = () => {
  useButtons(buttons)

  const isActive = useMoveToolIsActive()
  const dispatch = useDispatch()
  return (diory) => {
    if (isActive) {
      dispatch(updateDiory(diory))
      dispatch(inactivateButton())
    }
  }
}
