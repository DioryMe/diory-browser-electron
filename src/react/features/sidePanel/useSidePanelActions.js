import { useDispatchActions } from '../../store'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories/useLinkDiories'

import { updateDiory } from '../diograph/diographActions'

export const useSidePanelActions = ({ story }) => {
  const { selectStory } = useSelectStory()
  const { selectDiory } = useSelectDiory()
  const { linkDiories } = useLinkDiories()

  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      selectStory(diory)
      selectDiory(diory)
    },
    onClear: () => dispatch(updateDiory({ ...story, links: [] })),
    onDrop: ({ diory, draggedDiory }) => linkDiories(diory, draggedDiory),
    onBackgroundDrop: ({ draggedDiory }) => linkDiories(story, draggedDiory),
  }
}
