import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../store'
import { useCompare } from '../../../utils/useCompare'

import { updateDiory } from '../../room/actions'

const SEARCH_TOOL_ID = 'SEARCH_TOOL_ID'

export const useTextFilterValue = () => {
  const [{ textFilter }] = useStore((state) => state.filters)
  const [{ focus }] = useStore((state) => state.navigation)

  return {
    textFilterValue: SEARCH_TOOL_ID === focus ? textFilter : '',
  }
}

const diographToLinks = (diograph, diory) => ({
  ...diograph,
  [diory.id]: {
    id: diory.id,
  },
})

const getFilteredLinks = (diograph, query = '') =>
  Object.values(diograph)
    .filter(({ id }) => id !== SEARCH_TOOL_ID)
    .filter(({ text }) => !query || (text && text.toLowerCase().includes(query.toLowerCase())))
    .reduce(diographToLinks, {})

export const useTextFilter = () => {
  const [{ diograph }] = useStore((state) => state.room)
  const [{ textFilter }] = useStore((state) => state.filters)

  const textFilterChanged = useCompare(textFilter)
  const dispatch = useDispatch()
  useEffect(() => {
    if (textFilterChanged) {
      dispatch(
        updateDiory({
          id: SEARCH_TOOL_ID,
          text: `Search: ${textFilter}`,
          links: getFilteredLinks(diograph, textFilter),
        })
      )
    }
  }, [textFilterChanged, textFilter, diograph, dispatch])
}
