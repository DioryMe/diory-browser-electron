import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../store'
import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'
import { useDeleteTool } from '../tools/delete'
import { useDiographData } from '../diograph/utils/useDiographData'

import { createLink, updateDiory } from '../diograph/diographActions'

export const useSidebar = (storyKey) => {
  const { diograph } = useSelector((state) => state.diograph)
  const { story, memories } = useDiographData({ storyKey }, diograph)

  const selectStory = useStoryTool()
  const selectUpdatedDiory = useUpdateTool()
  const selectDeletedDiory = useDeleteTool()

  const { dispatch } = useDispatchActions()
  return {
    story,
    diorys: memories,
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
