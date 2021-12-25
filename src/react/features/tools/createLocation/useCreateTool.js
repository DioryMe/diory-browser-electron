import { v4 as uuid } from 'uuid'

import { useDispatchActions, useSelector } from '../../../store'
import { useButtons } from '../../buttons/useButtons'
import { inactivateButton } from '../../buttons/buttonsActions'
import { useDiograph } from '../../diograph/useDiograph'

import { createDiory, createLink } from '../../diograph/diographActions'

import { buttons, CREATE_LOCATION_TOOL_BUTTON } from './buttons'

export const useCreateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    if (CREATE_LOCATION_TOOL_BUTTON === active) {
      const id = uuid()
      dispatch(createDiory({ ...newDiory, id }))
      dispatch(createLink(story, { id }))
      dispatch(inactivateButton())
    }
  }
}
