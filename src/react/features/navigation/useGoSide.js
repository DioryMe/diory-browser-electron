import { useDispatchActions } from '../../store'
import { goSide } from './navigationActions'
import { useDiograph } from '../diograph/useDiograph'

export const useGoSide = () => {
  const { story, stories } = useDiograph()
  const { dispatch } = useDispatchActions()
  const storyIds = stories.map(({ id }) => id)

  if (!storyIds.length) {
    return {}
  }

  const storyIndex = storyIds.indexOf(story.id)
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
