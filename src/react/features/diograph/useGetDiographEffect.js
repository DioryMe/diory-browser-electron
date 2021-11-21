import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { selectStory } from '../navigation/actions'
import { getDiograph } from './actions'
import { setDioryLocation } from '../settings/actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetDiographEffect = () => {
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    invokeChannel(channels.GET_DIOGRAPH).then(({ diograph, rootId, folderLocation }) => {
      dispatch(selectStory({ id: rootId }))
      dispatch(getDiograph(diograph, rootId, folderLocation))
      dispatch(setDioryLocation(folderLocation))
    })
  }, [dispatch])
}
