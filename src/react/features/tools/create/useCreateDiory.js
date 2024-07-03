import { getDefaultImage } from '../../../../shared/getDefaultImage'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { inactivateButton } from '../../buttons/buttonsActions'
import { deselectTool } from '../toolsActions'
import { createDiory, createLink } from '../../diograph/diographActions'
import { addDioryToHand } from '../../hand/handActions'

export const useCreateDiory = () => {
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    const image = getDefaultImage()
    const { diory } = dispatch(createDiory({ image, ...newDiory }))
    dispatch(createLink(story, diory))
    dispatch(addDioryToHand(diory))
    dispatch(inactivateButton())
    dispatch(deselectTool())
  }
}
