import { useEffect } from 'react'
import { useDispatch } from '../../../../store'

import { enterRoom, setFocus } from '../../../navigation/actions'
import { setInactive } from '../../../tools/actions'
import { addConnection } from '../../actions'

import { useTools } from '../../../tools/hooks'

import { openChannel } from '../../../../client/client'
import { channels } from '../../../../../shared/constants'

import { ADD_CONNECTION_BUTTON } from './buttons'

export const useAddConnectionButton = () => {
  const { active } = useTools()

  const dispatch = useDispatch()
  useEffect(() => {
    if (ADD_CONNECTION_BUTTON === active) {
      dispatch(setInactive())
      window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then((result) => {
        const address = result.filePaths[0]
        openChannel(channels.GENERATE_DIOGRAPH, address).then(({ id, diograph }) => {
          if (!diograph[id]) {
            console.log(diograph)
            throw new Error(`RoomId ${id} not found from generated diograph`)
          }

          dispatch(addConnection({ address, room: id, connector: 'file' }))
          dispatch(enterRoom({ id }))
          dispatch(setFocus({ focus: id }))
        })
      })
    }
  }, [active, dispatch])
}
