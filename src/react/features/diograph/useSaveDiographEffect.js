import { useEffect } from 'react'
import { useStore, useDispatchActions } from '../../store'

import { saveDiograph } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { getUntrackedDiograph } from '../../utils'

export const useSaveDiographEffect = () => {
  const [{ folderLocation, rootId, diograph, updated }] = useStore((state) => state.diograph)

  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (updated) {
      debounceDispatchPromiseAction(
        () =>
          invokeChannel(channels.SAVE_ROOM, {
            path: folderLocation,
            room: { rootId, diograph: getUntrackedDiograph(diograph) },
          }),
        saveDiograph
      )
    }
  }, [rootId, updated, folderLocation, diograph, debounceDispatchPromiseAction])
}
