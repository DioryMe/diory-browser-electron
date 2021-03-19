import { useDispatch } from '../../../store'
import { useButtons } from '../../buttons'
import { useMoveToolIsActive } from './useMoveToolIsActive'

import { setActive, setOpen } from '../../buttons/actions'
import { updateDiory } from '../../diograph/actions'

import { buttons } from './buttons'

export const useMoveTool = () => {
  useButtons(buttons)

  const isActive = useMoveToolIsActive()
  const dispatch = useDispatch()
  return (diory) => {
    if (isActive) {
      dispatch(updateDiory(diory))
      dispatch(setActive(null))
      dispatch(setOpen(false))
    }
  }
}
