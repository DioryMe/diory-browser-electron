import { useEffect } from 'react'
import { useStore, promiseDispatch, useDispatch } from '../../../../store'
import { debounce } from '../../../../utils'

import { saveRoom } from '../../../room/actions'

import { connect } from '../client'
import { channels } from '../../../../../shared/constants'

const debouncePromiseDispatch = debounce(promiseDispatch, 1000)

export const useSaveRoom = () => {
  const [{ id, diograph, updated }] = useStore((state) => state.room)
  const [{ paths }] = useStore((state) => state.connector)
  const path = paths[id]

  const dispatch = useDispatch()
  useEffect(() => {
    if (updated) {
      debouncePromiseDispatch(
        dispatch,
        connect(channels.SAVE_ROOM, { path, room: { id, diograph } }),
        saveRoom
      )
    }
  }, [updated, path, id, diograph, dispatch])
}
