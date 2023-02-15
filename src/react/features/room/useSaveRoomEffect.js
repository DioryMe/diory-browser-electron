import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { saveRoom } from './roomActions'

export const useSaveRoomEffect = () => {
  const { updated, address } = useSelector((state) => state.room)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (updated && address) {
      dispatch(saveRoom())
    }
  }, [dispatch, updated, address])
}
