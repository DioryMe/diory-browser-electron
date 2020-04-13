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

const getFilteredLinks = (diograph, query = '') =>
  Object.values(diograph)
    .filter(({ id }) => id !== SEARCH_TOOL_ID)
    .filter(({ text }) => !query || (text && text.toLowerCase().includes(query.toLowerCase())))
    .reduce(diographToLinks, {})

const useUpdateSearchDiory = () => {
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

export const useSearchTool = () => {
  useUpdateSearchDiory()
}

export const useTurnOnSearchTool = () => {
  const [{ diograph }] = useStore((state) => state.room)
  const [{ focus }] = useStore((state) => state.navigation)

  const dispatch = useDispatch()
  const turnOn = () => {
    if (!diograph[SEARCH_TOOL_ID]) {
      dispatch(addDiory({ id: SEARCH_TOOL_ID }))
    }
    if (SEARCH_TOOL_ID !== focus) {
      dispatch(setFocus({ focus: SEARCH_TOOL_ID }))
    }
  }

  return { turnOn }
}

export const useSearchInputValue = () => {
  const [{ textFilter }] = useStore((state) => state.filters)
  const [{ focus }] = useStore((state) => state.navigation)

  return {
    searchInputValue: SEARCH_TOOL_ID === focus ? textFilter : '',
  }
}
