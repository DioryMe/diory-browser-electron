import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../store'
import { useStoryTool } from '../diory/tools/story'
import { useUpdateTool } from '../diory/tools/update'
import { useDeleteTool } from '../diory/tools/delete'

import { createLink } from '../diory/diographActions'
import { addDioryToHand, clearHand } from './handActions'

export const useHand = () => {
  const { hand } = useSelector((state) => state.hand)

  const selectStory = useStoryTool()
  const updateDiory = useUpdateTool()
  const deleteDiory = useDeleteTool()

  const { dispatch } = useDispatchActions()
  return {
    diorys: hand,
    onClick: ({ diory }) => {
      selectStory(diory)
      updateDiory(diory)
      deleteDiory(diory)
    },
    onClear: () => dispatch(clearHand()),
    onDrop: ({ diory, draggedDiory }) => {
      dispatch(createLink(diory, draggedDiory))
    },
    onBackgroundDrop: ({ draggedDiory }) => dispatch(addDioryToHand(draggedDiory)),
  }
}
