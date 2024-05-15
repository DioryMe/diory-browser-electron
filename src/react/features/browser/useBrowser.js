import { useDispatchActions, useSelector } from '../../store'
import { useDiograph } from '../diograph/useDiograph'
import { useToggleContent } from '../content/useToggleContent'

import { useDeleteTool } from '../tools/delete'
import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'

import { createLink } from '../diograph/diographActions'

export const useBrowser = () => {
  const { story, memories } = useDiograph()
  const { forward = [] } = useSelector((state) => state.navigation)

  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  const { toggleContent } = useToggleContent()

  const { dispatch } = useDispatchActions()
  return {
    story,
    memories,
    scrollIntoViewId: forward[0],
    onStoryClick: ({ diory }) => {
      toggleContent()
      deleteDiory(diory)
      updateDiory(diory)
    },
    onMemoryClick: ({ diory }) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onDrop: ({ diory, draggedDiory }) => {
      dispatch(createLink(diory, draggedDiory))
    },
  }
}
