import { v4 as uuid } from 'uuid'

import { useDispatchActions, useStore } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDioryToHand } from '../toolsActions'
import { createDiory, createLink } from '../../diograph/diographActions'

import { getDefaultImage } from '../../../../shared/getDefaultImage'

import { CREATE_TOOL_BUTTON } from './buttons'

export const useCreateDiory = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    if (CREATE_TOOL_BUTTON === active) {
      if (!newDiory.image) {
        newDiory.image = getDefaultImage()
      }
      const id = uuid()
      dispatch(createDiory({ ...newDiory, id }))
      dispatch(createLink(story, { id }))
      dispatch(inactivateButton())
      dispatch(addDioryToHand(id))
    }
  }
}
