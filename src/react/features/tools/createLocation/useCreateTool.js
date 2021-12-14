import { useDispatchActions, useStore } from '../../../store'
import { useButtons } from '../../buttons/useButtons'
import { inactivateButton } from '../../buttons/buttonsActions'
import { useDiograph } from '../../diograph/useDiograph'

import { createDiory, createLink } from '../../diograph/diographActions'

import { buttons, CREATE_LOCATION_TOOL_BUTTON } from './buttons'

export const useCreateTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.buttons)
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    if (CREATE_LOCATION_TOOL_BUTTON === active) {
      dispatch(createDiory(newDiory))
      dispatch(createLink(story, { id }))
      dispatch(inactivateButton())
    }
  }
}
