import { useEffect } from 'react'
import { useStore, usePromiseDispatch } from '../../../store'

import { saveRoom } from '../../room/actions'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

export const useSaveRoom = () => {
  const [{ id, diograph, updated }] = useStore(state => state.room)
  const [{ paths }] = useStore(state => state.connector)
  const path = paths[id]

  const promiseDispatch = usePromiseDispatch()
  useEffect(() => {
    if (updated) {
      promiseDispatch(saveRoom, () =>
        connect(channels.SAVE_ROOM, { path, room: { id, diograph } })
      )
    }
  }, [updated, path, id, diograph, promiseDispatch])
}
