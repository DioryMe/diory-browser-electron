import { useDispatchActions } from '../../../store'
import { goSide } from '../navigationActions'
import { useStoryDiories } from '../../diograph/utils/useDiories'
import { useStoryContextDiories } from '../../diograph/utils/useContextDiories'

export const useGoSide = () => {
  const { story = {} } = useStoryDiories()
  const { stories } = useStoryContextDiories()
  const { dispatch } = useDispatchActions()
  const storyKeys = stories.map(({ key }) => key)

  if (!storyKeys.length) {
    return {}
  }

  const storyIndex = storyKeys.indexOf(story.key)
  if (storyIndex === 0) {
    return {
      goRight: () => dispatch(goSide({ key: storyKeys[storyIndex + 1] })),
    }
  }

  if (storyIndex === storyKeys.length - 1) {
    return {
      goLeft: () => dispatch(goSide({ key: storyKeys[storyIndex - 1] })),
    }
  }

  return {
    goRight: () => dispatch(goSide({ key: storyKeys[storyIndex + 1] })),
    goLeft: () => dispatch(goSide({ key: storyKeys[storyIndex - 1] })),
  }
}
