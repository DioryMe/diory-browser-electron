import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { saveDiograph } from './diographActions'

export const useSaveDiographEffect = () => {
  const { updated } = useSelector((state) => state.diograph)
  const { dioryFolderLocation } = useSelector((state) => state.settings)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (updated && dioryFolderLocation) {
      dispatch(saveDiograph())
    }
  }, [dispatch, updated, dioryFolderLocation])
}
