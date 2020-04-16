import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../store'
import { useCompare } from '../../../utils/useCompare'
import { setTextFilter } from '../actions'

export const useResetTextFilter = () => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const [{ textFilter }] = useStore((state) => state.filters)

  const roomChanges = useCompare(roomId)
  const dispatch = useDispatch()
  useEffect(() => {
    if (textFilter && roomChanges) {
      dispatch(setTextFilter(''))
    }
  }, [textFilter, roomChanges, dispatch])
}
