import { useDispatchActions, useSelector } from '../../store'

import { selectStory } from './navigationActions'

export const useHomeButton = () => {
  const { address: key } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIORY',
    onClick: () => dispatch(selectStory({ key })),
  }
}
