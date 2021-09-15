import { useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import { useDispatch, useStore } from '../../../../store'
import { addRoom } from '../../../rooms/actions'

import { enterRoom, setFocus } from '../../../navigation/actions'
import { inactivateButton } from '../../../buttons/actions'
import { addConnection } from '../../actions'

import { invokeChannel } from '../../../../client/client'
import { channels } from '../../../../../shared/constants'

import { ADD_CONNECTION_BUTTON } from './buttons'

export const useAddConnectionButton = () => {
  const [{ active }] = useStore((state) => state.buttons)

  const dispatch = useDispatch()
  useEffect(() => {
    const getHome = (result) => {
      const address = result.filePaths[0]
      invokeChannel(channels.GENERATE_DIOGRAPH, address).then(({ rootId, diograph }) => {
        const roomId = uuid()
        dispatch(addConnection({ address, room: roomId, connector: 'file' }))
        dispatch(addRoom(roomId, diograph[rootId]))
        dispatch(enterRoom({ id: roomId }))
        dispatch(setFocus({ id: rootId }))
      })
    }

    if (ADD_CONNECTION_BUTTON === active) {
      dispatch(inactivateButton())
      if (window.processEnv.TESTCAFE_TEST) {
        const path = `${window.processEnv.PWD}/tmp/testcafe-diograph-folder`
        const result = { filePaths: [path] }
        getHome(result)
      } else {
        window.channelsApi.showOpenDialog().then((result) => {
          getHome(result)
        })
      }
    }
  }, [active, dispatch])
}
