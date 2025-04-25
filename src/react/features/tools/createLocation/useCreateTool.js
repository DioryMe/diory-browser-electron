import { useDispatchActions, useSelector } from '../../../store'
import { useButtons } from '../../buttons/useButtons'
import { inactivateButton } from '../../buttons/buttonsActions'
import { useDiories } from '../../diograph/utils/useDiories'

import { createDiory, createLink } from '../../diograph/diographActions'

import { buttons, CREATE_LOCATION_TOOL_BUTTON } from './buttons'

export const useCreateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { story } = useDiories()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    if (CREATE_LOCATION_TOOL_BUTTON === active) {
      const { diory } = dispatch(createDiory(newDiory))
      dispatch(createLink(story, diory))
      dispatch(inactivateButton())
    }
  }
}
