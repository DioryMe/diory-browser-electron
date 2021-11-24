import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { setDioryLocation } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetDioryLocation = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    invokeChannel(channels.GET_DIOGRAPH).then(({ folderLocation }) => {
      dispatch(setDioryLocation(folderLocation))
    })
  }, [dispatch])
}
