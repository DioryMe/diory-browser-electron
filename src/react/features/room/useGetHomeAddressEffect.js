import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { setRoomAddress } from './roomActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetHomeAddressEffect = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    invokeChannel(channels.GET_DIORY_FOLDER_LOCATION).then(({ dioryFolderLocation }) => {
      dispatch(setRoomAddress(dioryFolderLocation))
    })
  }, [dispatch])
}
