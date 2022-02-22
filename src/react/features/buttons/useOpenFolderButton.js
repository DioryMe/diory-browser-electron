import { useEffect } from 'react'
import { useButtons } from './useButtons'
import { useDispatchActions, useSelector } from '../../store'
import { inactivateButton } from './buttonsActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const OPEN_BUTTON = 'OPEN_BUTTON'

const buttons = [
  {
    id: OPEN_BUTTON,
    text: 'Open',
    data: {
      order: 0,
      type: 'content',
      icon: 'folder-open',
      testid: 'folder',
      visible: true,
    },
  },
]

export const useOpenFolderButton = (fileUrl) => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const open = active === OPEN_BUTTON

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (open) {
      invokeChannel(channels.OPEN_FOLDER, fileUrl)
      dispatch(inactivateButton())
    }
  }, [dispatch, open, fileUrl])
}
