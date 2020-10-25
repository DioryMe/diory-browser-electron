import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../../store'
import { updateRoom } from '../../../home/actions'

import { setFocus } from '../../../navigation/actions'
import { getRoom, setUpdateRoom } from '../../../room/actions'
import { setInactive } from '../../../tools/actions'
import { addConnection } from '../../actions'

import { useTools } from '../../../tools/hooks'

import { openChannel } from '../../../../client/client'
import { channels } from '../../../../../shared/constants'

import { ADD_CONNECTION_BUTTON } from './buttons'

export const useAddConnectionButton = () => {
  const { active } = useTools()
  const [{ roomId }] = useStore((state) => state.navigation)

  const dispatch = useDispatch()
  useEffect(() => {
    if (ADD_CONNECTION_BUTTON === active) {
      dispatch(setInactive())
      window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then((result) => {
        const path = result.filePaths[0]
        openChannel(channels.GENERATE_DIOGRAPH, path).then(({ id, diograph, path }) => {
          dispatch(getRoom({ id, diograph }))
          dispatch(setUpdateRoom())
          dispatch(addConnection({ address: path, room: roomId, diory: id, connector: 'file' }))
          dispatch(updateRoom({ id: roomId, root: id }))
          dispatch(setFocus({ focus: id }))
        })
      })
    }
  }, [active, dispatch, roomId])
}
