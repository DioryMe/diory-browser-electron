import { useDispatch } from '../../../store'
import { useButtons } from '../../buttons'
import { updateDiory } from '../../diograph/actions'

import { buttons } from './buttons'
import { useMoveToolIsActive } from './useMoveToolIsActive'

export const useMoveTool = () => {
  useButtons(buttons)

  const isActive = useMoveToolIsActive()
  const dispatch = useDispatch()
  return (diory) => {
    if (isActive) {
      dispatch(updateDiory(diory))
    }
  }
}
