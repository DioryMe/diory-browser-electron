import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { getDiograph } from './diographActions'

export const useGetDiographEffect = () => {
  const { dioryFolderLocation } = useSelector((state) => state.settings)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (dioryFolderLocation) {
      dispatch(getDiograph())
    }
  }, [dispatch, dioryFolderLocation])
}
