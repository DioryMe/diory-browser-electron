import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../store'

import { addDiograph, addLink } from '../../room/actions'
import { setInactive } from '../../tools/actions'

import { useTools } from '../../tools/hooks'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

import * as buttons from './buttons'

export const useGenerateDiograph = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const { active } = useTools()
  const dispatch = useDispatch()
  useEffect(() => {
    if (buttons.GENERATE_DIOGRAPH === active) {
      dispatch(setInactive())
      window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then((result) => {
        const path = result.filePaths[0]
        connect(channels.GENERATE_DIOGRAPH, path).then(({ id, diograph }) => {
          dispatch(addDiograph(diograph))
          dispatch(addLink({ id: focus, link: id }))
        })
      })
    }
  }, [active, focus, dispatch])
}
