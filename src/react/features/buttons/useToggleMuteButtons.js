import { useEffect } from 'react'
import { useToggleButtons } from './useToggleButtons'

export const UNMUTE_BUTTON = 'UNMUTE_BUTTON'
export const MUTE_BUTTON = 'MUTE_BUTTON'

const buttons = [
  {
    id: UNMUTE_BUTTON,
    text: 'Unmute',
    data: {
      order: 2,
      icon: 'volume-off',
      testid: 'unmute',
      type: 'content',
      enableDioryClick: true,
    },
  },
  {
    id: MUTE_BUTTON,
    text: 'Mute',
    data: {
      order: 2,
      icon: 'volume-up',
      testid: 'mute',
      type: 'content',
      enableDioryClick: true,
    },
  },
]

export const useToggleMuteButtons = (contentElement, mutedInitially) => {
  const [unmute, mute] = useToggleButtons(buttons, mutedInitially)
  useEffect(() => {
    mute && (contentElement.muted = true)
    unmute && (contentElement.muted = false)
  }, [contentElement, mute, unmute])
}
