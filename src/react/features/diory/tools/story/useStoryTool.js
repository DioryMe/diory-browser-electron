import { useDispatchActions, useSelector } from '../../../../store'
import { selectStory } from '../../../navigation/navigationActions'

export const useStoryTool = () => {
  const { active, activeButton } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  return (clickedDiory) => {
    if (!active || activeButton.data.enableDioryClick) {
      dispatch(selectStory(clickedDiory))
    }
  }
}
