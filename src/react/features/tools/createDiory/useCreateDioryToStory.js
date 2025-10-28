import { getDefaultImage } from '../../diograph/utils/getDefaultImage'

import { useDispatchActions } from '../../../store'
import { useStoryDiories } from '../../diograph/utils/useDiories'

import { createDiory, createLink } from '../../diograph/diographActions'

export const useCreateDioryToStory = () => {
  const { story } = useStoryDiories()

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
