import { useEffect } from 'react'
import { useStore, promiseDispatch, useDispatch } from '../../../../store'
import { debounce } from '../../../../utils'

import { saveRoom } from '../../../room/actions'
import { useIpfsFactory } from '../client/useIpfsFactory'

import { saveDiograph } from '../client/client'

const debouncePromiseDispatch = debounce(promiseDispatch, 1000)

const saveRoomToIpfs = async (ipfs, { id, diograph }) => {
  console.log('SAVE_ROOM_TO_IPFS', { id, diograph })

  const address = await saveDiograph(ipfs, diograph)
  return {
    room: id,
    address,
  }
}

export const useSaveRoomEffect = () => {
  const { ipfs } = useIpfsFactory()

  const [{ id, diograph, updated }] = useStore((state) => state.room)

  const dispatch = useDispatch()
  useEffect(() => {
    if (updated) {
      debouncePromiseDispatch(
        dispatch,
        saveRoomToIpfs(ipfs, { id, diograph }),
        saveRoom,
      )
    }
  }, [updated, id, diograph, dispatch])
}
