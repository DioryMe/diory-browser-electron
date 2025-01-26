import { useDispatchActions, useSelector } from '../../../store'
import { useButtons } from '../../buttons/useButtons'

import { inactivateButton } from '../../buttons/buttonsActions'
import { updateDiory } from '../../diograph/diographActions'

import { buttons, MOVE_TOOL_BUTTON } from './buttons'

export const useMoveTool = () => {
  useButtons(buttons)
  const { active } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  return (diory) => {
    if (MOVE_TOOL_BUTTON === active) {
      dispatch(updateDiory(diory))
      dispatch(inactivateButton())
    }
  }
}
