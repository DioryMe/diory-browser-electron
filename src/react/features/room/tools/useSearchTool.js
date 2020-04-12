import { useDispatch, useStore } from '../../../store'

import { setFocus } from '../../navigation/actions'
import { addDiory, updateDiory } from '../../room/actions'

const SEARCH_TOOL_ID = 'SEARCH_TOOL_ID'

const useUpdateSearchDiory = () => {
  const [{ diograph }] = useStore((state) => state.room)

  const diographToLinks = (diograph, diory) => ({
    ...diograph,
    [diory.id]: {
      id: diory.id,
    },
  })

  const getFilteredLinks = (query = '') =>
    Object.values(diograph)
      .filter(({ id }) => id !== SEARCH_TOOL_ID)
      .filter(({ text }) => text && text.toLowerCase().includes(query.toLowerCase()))
      .reduce(diographToLinks, {})

  const updateSearchDiory = (query) =>
    updateDiory({
      id: SEARCH_TOOL_ID,
      text: 'Search: ' + query,
      links: getFilteredLinks(query),
    })

  return {
    updateSearchDiory,
  }
}

export const useSearchTool = () => {
  const [{ diograph }] = useStore((state) => state.room)
  const { updateSearchDiory } = useUpdateSearchDiory()

  const dispatch = useDispatch()

  const onFocus = (query) => {
    if (!diograph[SEARCH_TOOL_ID]) {
      dispatch(addDiory({ id: SEARCH_TOOL_ID }))
    }

    dispatch(updateSearchDiory(query))
    dispatch(setFocus({ focus: SEARCH_TOOL_ID }))
  }

  const onChange = (query) => {
    dispatch(updateSearchDiory(query))
  }

  return {
    onFocus,
    onChange,
  }
}
