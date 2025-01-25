import { useDispatchActions, useSelector } from '../../../../store'
import { useButtons } from '../../../buttons/useButtons'
import { inactivateButton } from '../../../buttons/buttonsActions'
import { useDiograph } from '../../../home/useDiograph'

import { createDiory, createLink } from '../../diographActions'

import { buttons, CREATE_LOCATION_TOOL_BUTTON } from './buttons'

export const useCreateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    if (CREATE_LOCATION_TOOL_BUTTON === active) {
      const { diory } = dispatch(createDiory(newDiory))
      dispatch(createLink(story, diory))
      dispatch(inactivateButton())
    }
  }
}
