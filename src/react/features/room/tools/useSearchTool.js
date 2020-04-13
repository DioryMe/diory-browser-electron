import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../store'
import { useCompare } from '../../../utils/useCompare'

import { setFocus } from '../../navigation/actions'
import { addDiory, updateDiory } from '../actions'

const SEARCH_TOOL_ID = 'SEARCH_TOOL_ID'

const diographToLinks = (diograph, diory) => ({
  ...diograph,
  [diory.id]: {
    id: diory.id,
  },
})

const useSearchDiory = () => {
  const [{ diograph }] = useStore((state) => state.room)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!diograph[SEARCH_TOOL_ID]) {
      dispatch(addDiory({ id: SEARCH_TOOL_ID }))
    }
  }, [diograph, dispatch])
}

const getFilteredLinks = (diograph, query = '') =>
  Object.values(diograph)
    .filter(({ id }) => id !== SEARCH_TOOL_ID)
    .filter(({ text }) => !query || (text && text.toLowerCase().includes(query.toLowerCase())))
    .reduce(diographToLinks, {})

const useUpdateSearchDiory = () => {
  const [{ diograph }] = useStore((state) => state.room)
  const [{ textFilter }] = useStore((state) => state.filters)
  const [{ focus }] = useStore((state) => state.navigation)

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
      if (SEARCH_TOOL_ID !== focus) {
        dispatch(setFocus({ focus: SEARCH_TOOL_ID }))
      }
    }
  }, [textFilterChanged, textFilter, diograph, focus, dispatch])
}

export const useSearchTool = () => {
  useSearchDiory()
  useUpdateSearchDiory()
}

export const useSearchInputValue = () => {
  const [{ textFilter }] = useStore((state) => state.filters)
  const [{ focus }] = useStore((state) => state.navigation)

  return {
    searchInputValue: SEARCH_TOOL_ID === focus ? textFilter : '',
  }
}
