import { useDispatchActions, useSelector } from '../../../../store'

import { inactivateButton } from '../../../buttons/buttonsActions'
import { createDiory, createLink } from '../../../diograph/diographActions'

import { getStoryDiories } from '../../../diograph/utils/getStoryDiories'

import { CREATE_LOCATION_TOOL_BUTTON } from './buttons'

export const useCreateTool = () => {
  const { active } = useSelector((state) => state.buttons)
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story } = getStoryDiories(storyKey, diograph)

  const { dispatch } = useDispatchActions()
  return (newDiory) => {
    if (CREATE_LOCATION_TOOL_BUTTON === active) {
      const { diory } = dispatch(createDiory(newDiory))
      dispatch(createLink(story, diory))
      dispatch(inactivateButton())
    }
  }
}
