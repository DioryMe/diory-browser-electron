import { useDispatchActions, useSelector } from '../../../store'
import { useButtons } from '../../buttons/useButtons'
import { inactivateButton } from '../../buttons/buttonsActions'
import { useDiories } from '../../diograph/utils/useDiories'

import { updateDiory } from '../../diograph/diographActions'

import { buttons, ADD_LOCATION_TOOL_BUTTON } from './buttons'

export const useAddLocationTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { story } = useDiories()
  const { dispatch } = useDispatchActions()

  return ({ latlng }) => {
    if (ADD_LOCATION_TOOL_BUTTON === active) {
      dispatch(updateDiory({ ...story, latlng }))
      dispatch(inactivateButton())
    }
  }
}
