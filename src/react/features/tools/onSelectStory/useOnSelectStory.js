import { useDispatchActions, useSelector } from '../../../store'
import { selectStory } from '../../navigation/navigationActions'

export const useOnSelectStory = () => {
  const { active, activeButton } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  return ({ diory }) => {
    if (!active || activeButton.data.enableDioryClick) {
      console.log('selectStory', diory)
      dispatch(selectStory(diory))
    }
  }
}
