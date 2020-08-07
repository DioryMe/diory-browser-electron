import { useEffect } from 'react'
import { useDispatch } from '../../../../store'

import { enterRoom } from '../../../navigation/actions'
import { getRoom, updateRoom } from '../../../room/actions'
import { setInactive } from '../../../tools/actions'
import { addPath } from '../actions'

import { useTools } from '../../../tools/hooks'

import { connect } from '../client/client'
import { channels } from '../../../../../shared/constants'

import { OPEN_ROOM_BUTTON } from './buttons'

export const useOpenRoomButton = () => {
  const { active } = useTools()
  const dispatch = useDispatch()
  useEffect(() => {
    if (OPEN_ROOM_BUTTON === active) {
      dispatch(setInactive())
      window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then((result) => {
        const path = result.filePaths[0]
        connect(channels.GENERATE_DIOGRAPH, path).then(({ id, diograph, path }) => {
          console.log('Frontend IPC received: GENERATE_DIOGRAPH', id, diograph, path)

          if (!diograph[id]) {
            console.log(diograph)
            throw new Error(`RoomId ${id} not found from generated diograph`)
          }

          dispatch(addPath(id, path))
          dispatch(enterRoom(id))
          dispatch(getRoom({ id, diograph }))
          dispatch(updateRoom())
        })
      })
    }
  }, [active, dispatch])
}
