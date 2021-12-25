import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { selectStory } from '../navigation/navigationActions'
import { getDiograph } from './diographActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetDiographEffect = () => {
  const { dioryFolderLocation } = useSelector((state) => state.settings)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (dioryFolderLocation) {
      invokeChannel(channels.GET_DIOGRAPH, dioryFolderLocation).then(({ diograph, rootId }) => {
        dispatch(getDiograph(diograph, rootId))
        dispatch(selectStory({ id: rootId }))
      })
    }
  }, [dispatch, dioryFolderLocation])
}
