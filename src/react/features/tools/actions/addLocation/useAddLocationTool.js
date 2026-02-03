import { useDispatchActions, useSelector } from '../../../../store'

import { useButtons } from '../../../buttons/useButtons'
import { useSelectedDiories } from '../../utils/useSelectedDiories'
import { useUpdateSelectedDiories } from '../updateSelectedDiories/useUpdateSelectedDiories'
import { useUpdateStory } from '../updateDiory/useUpdateStory'

import { inactivateButton } from '../../../buttons/buttonsActions'

import { buttons, ADD_LOCATION_TOOL_BUTTON } from './buttons'

export const useAddLocationTool = (disabled) => {
  useButtons(buttons, disabled)

  const { active } = useSelector((state) => state.buttons)
  const { selectedDiories } = useSelectedDiories()

  const updateStory = useUpdateStory()
  const { updateSelectedDiories } = useUpdateSelectedDiories()

  const { dispatch } = useDispatchActions()
  return ({ latlng }) => {
    if (ADD_LOCATION_TOOL_BUTTON === active) {
      // TODO remove selected diories check
      selectedDiories.length ? updateSelectedDiories({ latlng }) : updateStory({ latlng })
      dispatch(inactivateButton())
    }
  }
}
