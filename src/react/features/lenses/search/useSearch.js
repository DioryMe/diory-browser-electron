import { useDispatchActions, useSelector } from '../../../store'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'

import { createLink } from '../../diograph/diographActions'
import { searchDiories } from './searchActions'

export const useSearch = () => {
  const { query, resultsByQuery } = useSelector((state) => state.search)
  const selectStory = useStoryTool()
  const updateDiory = useUpdateTool()

  const { dispatch } = useDispatchActions()
  return {
    query,
    results: query ? resultsByQuery[query] : [],
    onSearch: ({ target: { value } }) => dispatch(searchDiories(value)),
    onClick: ({ diory }) => {
      selectStory(diory)
      updateDiory(diory)
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}
