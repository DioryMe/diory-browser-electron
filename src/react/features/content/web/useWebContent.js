import { useActiveButton } from '../../buttons/useActiveButton'
import { useActiveContent } from '../useActiveContent'

import { invokeChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'

export const BROWSER_BUTTON = 'BROWSER_BUTTON'

const buttons = [
  {
    id: BROWSER_BUTTON,
    text: 'Browser',
    data: {
      order: 0,
      type: 'content',
      icon: 'globe-network',
      testid: 'browser',
      visible: true,
    },
  },
]

const openInBrowser = (url) => () => invokeChannel(channels.OPEN_IN_BROWSER, url)

export const useWebContent = (url) => {
  useActiveButton(buttons, openInBrowser(url))
  useActiveContent(openInBrowser(url))
}
