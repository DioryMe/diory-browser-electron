import { v4 as uuid } from 'uuid'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDioryToHand, deselectTool } from '../toolsActions'
import { createDiory, createLink } from '../../diograph/diographActions'

export const useCreateDiory = () => {
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    const id = uuid()
    dispatch(createDiory({ ...newDiory, id }))
    dispatch(createLink(story, { id }))
    dispatch(inactivateButton())
    dispatch(deselectTool())
    dispatch(addDioryToHand(id))
  }
}
