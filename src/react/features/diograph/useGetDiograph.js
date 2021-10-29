import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { setFocus } from '../navigation/actions'
import { addDiograph } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetDiograph = () => {
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    invokeChannel(channels.GET_DIOGRAPH).then(({ diograph, rootId, folderLocation }) => {
      dispatch(addDiograph(diograph, rootId, folderLocation))
      dispatch(setFocus({ id: rootId }))
    })
  }, [dispatch])
}
