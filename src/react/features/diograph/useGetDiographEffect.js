import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { getDiograph } from './diographActions'

export const useGetDiographEffect = () => {
  const { roomId } = useSelector((state) => state.navigation)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (roomId) {
      dispatch(getDiograph({ id: roomId }))
    }
  }, [dispatch, roomId])
}
