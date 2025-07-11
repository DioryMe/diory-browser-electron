import { useDispatchActions, useSelector } from '../../../store'
import { selectStory } from '../../navigation/navigationActions'

export const useSelectStory = () => {
  const { active, activeButton } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  return {
    selectStory: (clickedDiory) => {
      if (!active || activeButton.data.enableDioryClick) {
        dispatch(selectStory(clickedDiory))
      }
    },
  }
}
