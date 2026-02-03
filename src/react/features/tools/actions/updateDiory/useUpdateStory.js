import { useDispatchActions, useSelector } from '../../../../store'

import { updateDiory } from '../../../diograph/diographActions'

export const useUpdateStory = () => {
  const { storyKey: key } = useSelector((state) => state.navigation)

  const { dispatch } = useDispatchActions()
  return (diory) => dispatch(updateDiory({ key, ...diory }))
}
