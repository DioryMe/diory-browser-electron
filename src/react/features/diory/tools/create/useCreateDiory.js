import { getDefaultImage } from '../../../../../shared/getDefaultImage'

import { useDispatchActions } from '../../../../store'
import { useDiograph } from '../../../home/useDiograph'

import { inactivateButton } from '../../../buttons/buttonsActions'
import { createDiory, createLink } from '../../diographActions'
import { addDioryToHand } from '../../../hand/handActions'

export const useCreateDiory = () => {
  const { story } = useDiograph()

  const { dispatch } = useDispatchActions()
  return (newDiory) => {
    const image = getDefaultImage()
    const { diory } = dispatch(createDiory({ image, ...newDiory }, newDiory.address))
    dispatch(createLink(story, diory))
    dispatch(addDioryToHand(diory))
    dispatch(inactivateButton())
  }
}
