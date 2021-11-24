import { useDispatch, useStore } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { goSide } from '../navigationActions'

export const useGoSide = () => {
  const [{ storyId }] = useStore((state) => state.navigation)
  const { stories } = useDiograph()
  const dispatch = useDispatch()
  const storyIds = stories.map(({ id }) => id)

  if (!storyIds.length) {
    return {}
  }

  const storyIndex = storyIds.indexOf(storyId)
  if (storyIndex === 0) {
    return {
      goRight: () => dispatch(goSide({ storyId: storyIds[storyIndex + 1] })),
    }
  }

  if (storyIndex === storyIds.length - 1) {
    return {
      goLeft: () => dispatch(goSide({ storyId: storyIds[storyIndex - 1] })),
    }
  }

  return {
    goRight: () => dispatch(goSide({ storyId: storyIds[storyIndex + 1] })),
    goLeft: () => dispatch(goSide({ storyId: storyIds[storyIndex - 1] })),
  }
}
