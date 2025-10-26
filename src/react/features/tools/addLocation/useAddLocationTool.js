import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'
import { useStoryDiories } from '../../diograph/utils/useDiories'
import { useSelectedDiories } from '../utils/useSelectedDiories'

import { updateDiory } from '../../diograph/diographActions'
import { clearSelectedDiories } from '../toolsActions'
import { inactivateButton } from '../../buttons/buttonsActions'

import { buttons, ADD_LOCATION_TOOL_BUTTON } from './buttons'

const useUpdateSelectedDiories = () => {
  const { selectedDiories } = useSelectedDiories()
  const { dispatch } = useDispatchActions()
  return {
    updateDiories: ({ latlng }) => {
      selectedDiories.forEach((diory) => {
        dispatch(updateDiory({ ...diory, latlng }))
      })
      dispatch(clearSelectedDiories())
    },
  }
}

const useUpdateStory = () => {
  const { story } = useStoryDiories()
  const { selectedDiories } = useSelectedDiories()
  const { dispatch } = useDispatchActions()
  return {
    updateStory: ({ latlng }) => {
      if (!selectedDiories.length) {
        dispatch(updateDiory({ ...story, latlng }))
      }
    },
  }
}

export const useAddLocationTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)

  const { updateStory } = useUpdateStory()
  const { updateDiories } = useUpdateSelectedDiories()

  const { dispatch } = useDispatchActions()
  return (diory) => {
    if (ADD_LOCATION_TOOL_BUTTON === active) {
      updateDiories(diory)
      updateStory(diory)
      dispatch(inactivateButton())
    }
  }
}
