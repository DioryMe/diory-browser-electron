import { useEffect } from 'react'

import { useDispatchActions, useStore } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { addButtons, inactivateButton, removeButtons } from '../../buttons/actions'

import { invokeChannel } from '../../../client/client'
import { buttons, OPEN_TOOL_BUTTON } from './buttons'

export const useOpenTool = () => {
  const { story } = useDiograph()
  const [{ active }] = useStore((state) => state.buttons)

  const contentUrl = story.data && story.data[0].contentUrl
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
      invokeChannel('openPath', contentUrl)
      dispatch(inactivateButton())
    }
  }, [contentUrl, open])
}
