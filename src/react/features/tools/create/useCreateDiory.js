import { v4 as uuid } from 'uuid'

import { useDispatchActions, useStore } from '../../../store'
import { inactivateButton } from '../../buttons/actions'
import { useFocus } from '../../diograph/hooks'
import { addDioryToHand } from '../actions'

import { createDiory, createLink } from '../../diograph/actions'
import { getDefaultImage } from '../../../../shared/getDefaultImage'

import { CREATE_TOOL_BUTTON } from './buttons'

export const useCreateDiory = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { diory: focusDiory } = useFocus()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    if (CREATE_TOOL_BUTTON === active) {
      if (!newDiory.image) {
        newDiory.image = getDefaultImage()
      }
      const id = uuid()
      dispatch(createDiory({ ...newDiory, id }))
      dispatch(createLink(focusDiory, { id }))
      dispatch(inactivateButton())
      dispatch(addDioryToHand(id))
    }
  }
}
