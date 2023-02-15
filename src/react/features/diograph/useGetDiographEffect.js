import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { getDiograph } from './diographActions'

export const useGetDiographEffect = () => {
  const { address } = useSelector((state) => state.room)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (address) {
      dispatch(getDiograph())
    }
  }, [dispatch, address])
}
