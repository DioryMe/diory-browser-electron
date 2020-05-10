import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../store'
import { useCompare } from '../../../utils/useCompare'

import { updateDiory } from '../../room/actions'
import { setTextFilter } from '../actions'

import { TEXT_FILTER_DIORY_ID } from './textFilterDioryId'

const diographToLinks = (diograph, diory) => ({
  ...diograph,
  [diory.id]: {
    id: diory.id,
  },
})

const getFilteredLinks = (diograph, query = '') =>
  Object.values(diograph)
    .filter(({ id }) => id !== TEXT_FILTER_DIORY_ID)
    .filter(({ text }) => !query || (text && text.toLowerCase().includes(query.toLowerCase())))
    .reduce(diographToLinks, {})

export const useTextFilterEffects = () => {
  const [{ diograph }] = useStore((state) => state.room)
  const [{ roomId }] = useStore((state) => state.navigation)
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ textFilter }] = useStore((state) => state.filters)

  const dispatch = useDispatch()
  const roomChanges = useCompare(roomId)
  useEffect(() => {
    if (textFilter && roomChanges) {
      dispatch(setTextFilter(''))
    }
  }, [textFilter, roomChanges, dispatch])

  const textFilterChanged = useCompare(textFilter)
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
