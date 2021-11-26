import { useEffect } from 'react'

import { useDispatchActions, useStore } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { addButtons, inactivateButton, removeButtons } from '../../buttons/actions'

import { invokeChannel } from '../../../client/client'
import { buttons, OPEN_TOOL_BUTTON } from './buttons'
import { convertRelativePath } from '../../../utils'

export const useOpenTool = () => {
  const { story } = useDiograph()
  const [{ active }] = useStore((state) => state.buttons)
  const [{ dioryFolderLocation }] = useStore((state) => state.settings)

  const contentUrl = story && story.data && story.data[0].contentUrl
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (contentUrl) {
      dispatch(addButtons(buttons))
    } else {
      dispatch(removeButtons(buttons))
    }
  }, [dispatch, contentUrl])

  const open = active === OPEN_TOOL_BUTTON
  useEffect(() => {
    if (open) {
      const absoluteContentUrl = convertRelativePath(contentUrl, dioryFolderLocation)
      invokeChannel('showItemInFolder', absoluteContentUrl)
      dispatch(inactivateButton())
    }
  }, [dispatch, contentUrl, open, dioryFolderLocation])
}
