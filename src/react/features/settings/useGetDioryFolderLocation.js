import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { setDioryFolderLocation } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetDioryFolderLocation = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    invokeChannel(channels.GET_DIOGRAPH).then(({ folderLocation }) => {
      dispatch(setDioryFolderLocation(folderLocation))
    })
  }, [dispatch])
}
