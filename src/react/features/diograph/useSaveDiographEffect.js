import { useEffect } from 'react'
import { useStore, useDispatchActions } from '../../store'

import { saveDiograph } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { getUntrackedDiograph } from '../../utils'

export const useSaveDiographEffect = () => {
  const [{ rootId, diograph, updated }] = useStore((state) => state.diograph)
  const [{ dioryLocation }] = useStore((state) => state.settings)

  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (updated && dioryLocation) {
      debounceDispatchPromiseAction(
        () =>
          invokeChannel(channels.SAVE_ROOM, {
            path: dioryLocation,
            room: { rootId, diograph: getUntrackedDiograph(diograph) },
          }),
        saveDiograph
      )
    }
  }, [rootId, updated, dioryLocation, diograph, debounceDispatchPromiseAction])
}
