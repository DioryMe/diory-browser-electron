import { useDispatch, useStore } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { goSide } from '../actions'

export const useGoSide = () => {
  const [{ storyId }] = useStore((state) => state.navigation)
  const { stories } = useDiograph()
  const dispatch = useDispatch()
  const storyIds = stories.map(({ id }) => id)

  if (!storyIds.length) {
    return {}
  }

  const focusIndex = storyIds.indexOf(storyId)
  if (focusIndex === 0) {
    return {
      goRight: () => dispatch(goSide({ storyId: storyIds[focusIndex + 1] })),
    }
  }

  if (focusIndex === storyIds.length - 1) {
    return {
      goLeft: () => dispatch(goSide({ storyId: storyIds[focusIndex - 1] })),
    }
  }

  return {
    goRight: () => dispatch(goSide({ storyId: storyIds[focusIndex + 1] })),
    goLeft: () => dispatch(goSide({ storyId: storyIds[focusIndex - 1] })),
  }
}
