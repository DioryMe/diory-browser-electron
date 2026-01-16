import { useSelector } from 'react-redux'
import { useDispatchActions } from '../../../store'

import { createDiory, createLink } from '../../diograph/diographActions'

import { getDefaultImage } from '../../diograph/utils/getDefaultImage'
import { getStoryDiories } from '../../diograph/utils/getStoryDiories'

export const useCreateDioryToStory = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story } = getStoryDiories(storyKey, diograph)

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
