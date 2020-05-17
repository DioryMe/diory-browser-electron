import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../store'

import { enterRoom } from '../../navigation/actions'
import { setInactive } from '../../tools/actions'
import { addPath } from '../actions'

import { useTools } from '../../tools/hooks'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

import { GENERATE_DIOGRAPH_BUTTON } from './buttons'

export const useOpenFolder = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const { active } = useTools()
  const dispatch = useDispatch()
  useEffect(() => {
    if (GENERATE_DIOGRAPH_BUTTON === active) {
      dispatch(setInactive())
      window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then((result) => {
        const path = result.filePaths[0]
        connect(channels.GENERATE_DIOGRAPH, path).then(({ id }) => {
          dispatch(addPath(id, path))
          dispatch(enterRoom(id))
        })
      })
    }
  }, [active, focus, dispatch])
}
