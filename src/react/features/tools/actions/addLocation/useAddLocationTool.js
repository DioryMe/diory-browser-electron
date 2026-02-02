import { useDispatchActions, useSelector } from '../../../../store'

import { useButtons } from '../../../buttons/useButtons'
import { useSelectedDiories } from '../../utils/useSelectedDiories'
import { useUpdateSelectedDiories } from '../updateSelectedDiories/useUpdateSelectedDiories'

import { updateDiory } from '../../../diograph/diographActions'
import { inactivateButton } from '../../../buttons/buttonsActions'

import { buttons, ADD_LOCATION_TOOL_BUTTON } from './buttons'

const useUpdateStory = () => {
  const { storyKey: key } = useSelector((state) => state.navigation)

  const { dispatch } = useDispatchActions()
  return {
    updateStory: ({ latlng }) => dispatch(updateDiory({ key, latlng })),
  }
}

export const useAddLocationTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { selectedDiories } = useSelectedDiories()

  const { updateStory } = useUpdateStory()
  const { updateSelectedDiories } = useUpdateSelectedDiories()

  const { dispatch } = useDispatchActions()
  return (diory) => {
    if (ADD_LOCATION_TOOL_BUTTON === active) {
      // TODO remove selected diories check
      selectedDiories.length ? updateSelectedDiories(diory) : updateStory(diory)
      dispatch(inactivateButton())
    }
  }
}
