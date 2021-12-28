import { useEffect } from 'react'
import { useSelector, useDispatchActions } from '../../store'

import { saveDiograph } from './diographActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const useSaveDiographEffect = () => {
  const { rootId, diograph, updated } = useSelector((state) => state.diograph)
  const { dioryFolderLocation } = useSelector((state) => state.settings)

  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (updated && dioryFolderLocation) {
      debounceDispatchPromiseAction(
        () =>
          invokeChannel(channels.SAVE_DIOGRAPH, {
            dioryFolderLocation,
            rootId,
            diograph,
          }),
        saveDiograph
      )
    }
  }, [rootId, updated, dioryFolderLocation, diograph, debounceDispatchPromiseAction])
}
