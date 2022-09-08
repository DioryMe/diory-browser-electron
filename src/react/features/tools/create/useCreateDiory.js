import { getDefaultImage } from '../../../../shared/getDefaultImage'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDioryToHand, deselectTool } from '../toolsActions'
import { createDiory, createLink } from '../../diograph/diographActions'

import { CREATE_TOOL } from './buttons'

export const useCreateDiory = () => {
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    const image = getDefaultImage()
    const { diory } = dispatch(createDiory({ image, ...newDiory }))
    dispatch(createLink(story, diory))
    dispatch(addDioryToHand(diory.id))
    dispatch(inactivateButton())
    dispatch(deselectTool())
  }
}
