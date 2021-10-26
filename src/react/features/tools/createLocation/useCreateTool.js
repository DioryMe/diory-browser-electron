import { v4 as uuid } from 'uuid'

import { useDispatchActions, useStore } from '../../../store'
import { useButtons } from '../../buttons'
import { inactivateButton } from '../../buttons/actions'
import { useDiograph } from '../../diograph/useDiograph'

import { createDiory, createLink } from '../../diograph/actions'

import { buttons, CREATE_LOCATION_TOOL_BUTTON } from './buttons'

export const useCreateTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.buttons)
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
