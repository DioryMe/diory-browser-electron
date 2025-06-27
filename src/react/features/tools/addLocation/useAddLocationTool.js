import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'
import { useDiories } from '../../diograph/utils/useDiories'

import { updateDiory } from '../../diograph/diographActions'
import { selectDiory } from '../../navigation/navigationActions'
import { inactivateButton } from '../../buttons/buttonsActions'

import { buttons, ADD_LOCATION_TOOL_BUTTON } from './buttons'

const useSelectedDiories = () => {
  const { selectedDiories } = useSelector((state) => state.navigation)
  const { diograph } = useSelector((state) => state.diograph)
  return Object.entries(selectedDiories)
    .filter(([, selected]) => selected)
    .map(([key]) => ({ key, ...diograph[key] }))
}

const useUpdateSelectedDiories = () => {
  const selectedDiories = useSelectedDiories()
  const { dispatch } = useDispatchActions()
  return {
    updateDiories: ({ latlng }) => {
      selectedDiories.forEach((diory) => {
        console.log(diory)
        dispatch(updateDiory({ ...diory, latlng }))
      })
      dispatch(selectDiory())
    }
  }
}

const useUpdateStory = () => {
  const { story } = useDiories()
  const { dispatch } = useDispatchActions()
  return {
    updateStory: ({ latlng }) => {
      dispatch(updateDiory({ ...story, latlng }))
    }
  }
}

export const useAddLocationTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const selectedDiories = useSelectedDiories()

  const { updateStory } = useUpdateStory()
  const { updateDiories } = useUpdateSelectedDiories()

  const { dispatch } = useDispatchActions()
  return (diory) => {
    if (ADD_LOCATION_TOOL_BUTTON === active) {
      if (selectedDiories.length) {
        updateDiories(diory)
      }
      if (!selectedDiories.length) {
        updateStory(diory)
      }
      dispatch(inactivateButton())
    }
  }
}
