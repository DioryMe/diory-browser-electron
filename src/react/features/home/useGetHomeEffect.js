import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../store'

import { getHomeDiograph } from './homeActions'

export const useGetHomeEffect = () => {
  const { diograph, loading, loaded } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (!diograph) {
      dispatch(getHomeDiograph())
    }
  }, [dispatch, diograph])

  return {
    loading,
    loaded,
  }
}
