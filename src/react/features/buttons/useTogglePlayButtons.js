import { useEffect } from 'react'
import { useToggleButtons } from './useToggleButtons'

export const PLAY_BUTTON = 'PLAY_BUTTON'
export const PAUSE_BUTTON = 'PAUSE_BUTTON'

const buttons = [
  {
    id: PLAY_BUTTON,
    text: 'Play',
    data: {
      order: 1,
      icon: 'play',
      testid: 'play',
      type: 'content',
      enableDioryClick: true,
    },
  },
  {
    id: PAUSE_BUTTON,
    text: 'Pause',
    data: {
      order: 1,
      icon: 'pause',
      testid: 'pause',
      type: 'content',
      enableDioryClick: true,
    },
  },
]

export const useTogglePlayButtons = (contentElement, playInitially) => {
  const [play, pause] = useToggleButtons(buttons, !playInitially)
  useEffect(() => {
    play && contentElement.play()
    pause && contentElement.pause()
  }, [contentElement, play, pause])
}
