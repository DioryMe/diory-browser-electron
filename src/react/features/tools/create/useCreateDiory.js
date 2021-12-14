import { useDispatchActions, useStore } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDioryToHand } from '../toolsActions'
import { createDiory, createLink } from '../../diograph/diographActions'

import { CREATE_TOOL_BUTTON } from './buttons'

export const useCreateDiory = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    if (CREATE_TOOL_BUTTON === active) {
      dispatch(createDiory(newDiory))
      dispatch(createLink(story, { id }))
      dispatch(inactivateButton())
      dispatch(addDioryToHand(id))
    }
  }
}
