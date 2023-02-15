import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { getRoom } from './roomActions'

export const useGetRoomEffect = () => {
  const { address } = useSelector((state) => state.room)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (address) {
      dispatch(getRoom())
    }
  }, [dispatch, address])
}
