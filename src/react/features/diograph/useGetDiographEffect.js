import { useEffect } from 'react'

import { useDispatchActions, useStore } from '../../store'

import { selectStory } from '../navigation/actions'
import { getDiograph } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useGetDiographEffect = () => {
  const [{ dioryLocation }] = useStore((state) => state.settings)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (dioryLocation) {
      invokeChannel(channels.GET_DIOGRAPH, dioryLocation).then(({ diograph, rootId }) => {
        dispatch(selectStory({ id: rootId }))
        dispatch(getDiograph(diograph, rootId))
      })
    }
  }, [dispatch, dioryLocation])
}
