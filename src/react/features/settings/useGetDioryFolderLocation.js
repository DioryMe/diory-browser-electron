import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { setDioryFolderLocation } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetDioryFolderLocation = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    invokeChannel(channels.GET_DIORY_FOLDER_LOCATION).then(({ dioryFolderLocation }) => {
      dispatch(setDioryFolderLocation(dioryFolderLocation))
    })
  }, [dispatch])
}
