import { useEffect } from 'react'
import { useDispatch } from '../../../store'

import { addRoom } from '../../home/actions'
import { addPath } from '../actions'
import { setInactive } from '../../tools/actions'

import { useTools } from '../../tools/hooks'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

import * as buttons from './buttons'

export const useAddRoom = () => {
  const { active } = useTools()
  const dispatch = useDispatch()
  useEffect(() => {
    if (buttons.ADD_ROOM === active) {
      dispatch(setInactive())
      window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
        const path = result.filePaths[0]
        connect(channels.ADD_ROOM, path).then(room => {
          dispatch(addPath(room.id, path))
          dispatch(addRoom(room))
        })
      })
    }
  }, [active, dispatch])
}
