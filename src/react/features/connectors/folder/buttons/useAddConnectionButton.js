import { useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import { useDispatch, useStore } from '../../../../store'
import { addRoom } from '../../../rooms/actions'

import { enterRoom, setFocus } from '../../../navigation/actions'
import { setInactive } from '../../../buttons/actions'
import { addConnection } from '../../actions'

import { openChannel } from '../../../../client/client'
import { channels } from '../../../../../shared/constants'

import { ADD_CONNECTION_BUTTON } from './buttons'

export const useAddConnectionButton = () => {
  const [{ active }] = useStore((state) => state.buttons)

  const dispatch = useDispatch()
  useEffect(() => {
    if (ADD_CONNECTION_BUTTON === active) {
      dispatch(setInactive())
      window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then((result) => {
        const address = result.filePaths[0]
        openChannel(channels.GENERATE_DIOGRAPH, address).then(({ id, diograph }) => {
          const roomId = uuid()
          dispatch(addConnection({ address, room: roomId, connector: 'file' }))
          dispatch(addRoom(roomId, diograph[id]))
          dispatch(enterRoom({ id: roomId }))
          dispatch(setFocus({ focus: id }))
        })
      })
    }
  }, [active, dispatch])
}
