import { getDefaultImage } from '../../../../shared/getDefaultImage'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { createDiory, createLink } from '../../diograph/diographActions'

export const useCreateDiory = () => {
  const { story } = useDiograph()

  const { dispatch } = useDispatchActions()
  return (newDiory) => {
    const image = getDefaultImage()
    if (!newDiory.key) {
      const { diory } = dispatch(createDiory({ image, ...newDiory }))
      dispatch(createLink(story, diory))
    }
    if (newDiory.key) {
      dispatch(createLink(story, newDiory))
    }
  }
}
