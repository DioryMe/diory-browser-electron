import { useEffect } from 'react'
import { useStore, useDispatchActions } from '../../store'

import { saveDiograph } from './diographActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { getUntrackedDiograph } from '../../utils'

export const useSaveDiographEffect = () => {
  const [{ rootId, diograph, updated }] = useStore((state) => state.diograph)
  const [{ dioryFolderLocation }] = useStore((state) => state.settings)

  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (updated && dioryFolderLocation) {
      debounceDispatchPromiseAction(
        () =>
          invokeChannel(channels.SAVE_DIOGRAPH, dioryFolderLocation, {
            rootId,
            diograph: getUntrackedDiograph(diograph),
          }),
        saveDiograph
      )
    }
  }, [rootId, updated, dioryFolderLocation, diograph, debounceDispatchPromiseAction])
}
