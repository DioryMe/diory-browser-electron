import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { addButtons, inactivateButton, removeButtons } from '../../buttons/buttonsActions'

import { invokeChannel } from '../../../client/client'
import { buttons, OPEN_TOOL_BUTTON } from './buttons'

export const useOpenTool = () => {
  const { story } = useDiograph()
  const { active } = useSelector((state) => state.buttons)

  const url = story && story.data && story.data[0].url
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (url) {
      dispatch(addButtons(buttons))
    } else {
      dispatch(removeButtons(buttons))
    }
  }, [dispatch, url])

  const open = active === OPEN_TOOL_BUTTON
  useEffect(() => {
    if (open) {
      invokeChannel('openWebsiteInBrowser', url)
      dispatch(inactivateButton())
    }
  }, [dispatch, url, open])
}
