import { useEffect } from 'react'
import { useButtons } from './useButtons'
import { useDispatchActions, useSelector } from '../../store'
import { invokeChannel } from '../../client/client'
import { inactivateButton } from './buttonsActions'

export const OPEN_BUTTON = 'OPEN_BUTTON'

const buttons = [
  {
    id: OPEN_BUTTON,
    text: 'Open',
    data: {
      order: 0,
      type: 'content',
      icon: 'folder-open',
      testid: 'open',
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
      invokeChannel('showItemInFolder', fileUrl)
      dispatch(inactivateButton())
    }
  }, [dispatch, open, fileUrl])
}
