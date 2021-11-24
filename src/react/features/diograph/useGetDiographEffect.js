import { useEffect } from 'react'

import { useDispatchActions, useStore } from '../../store'

import { selectStory } from '../navigation/actions'
import { getDiograph } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetDiographEffect = () => {
  const [{ dioryFolderLocation }] = useStore((state) => state.settings)
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
