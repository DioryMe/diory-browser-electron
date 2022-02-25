import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'
import { useButtons } from './useButtons'

import { inactivateButton } from './buttonsActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const BROWSER_BUTTON = 'BROWSER_BUTTON'

const buttons = [{
  id: BROWSER_BUTTON,
  text: 'Browser',
  data: {
    order: 0,
    type: 'content',
    icon: 'globe-network',
    testid: 'browser',
    visible: true,
  },
}]

export const useOpenInBrowser = (url) => {
  useButtons(buttons)
  const { active } = useSelector((state) => state.buttons)
  const open = active === BROWSER_BUTTON

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (open) {
      invokeChannel(channels.OPEN_IN_BROWSER, url)
      dispatch(inactivateButton())
    }
  }, [dispatch, open, url])
}
