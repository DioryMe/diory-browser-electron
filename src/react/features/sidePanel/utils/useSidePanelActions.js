import { useDispatchActions } from '../../../store'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useDeleteTool } from '../../tools/delete'

import { createLink, updateDiory } from '../../diograph/diographActions'

export const useSidePanelActions = ({ story }) => {
  const selectStory = useStoryTool()
  const selectUpdatedDiory = useUpdateTool()
  const selectDeletedDiory = useDeleteTool()

  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      selectStory(diory)
      selectUpdatedDiory(diory)
      selectDeletedDiory(diory)
    },
    onClear: () => dispatch(updateDiory({ ...story, links: [] })),
    onDrop: ({ diory, draggedDiory }) => dispatch(createLink(diory, draggedDiory)),
    onBackgroundDrop: ({ draggedDiory }) => dispatch(createLink(story, draggedDiory)),
  }
}
