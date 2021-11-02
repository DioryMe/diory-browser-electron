import { useCallback, useEffect, useState } from 'react'

import { useDispatchActions, useStore } from '../../../store'
import { buttons, PLAY_BUTTON, PAUSE_BUTTON } from './buttons'

import { addButtons, removeButtons } from '../../buttons/actions'

const useAddAndRemoveButtons = (playElement) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (playElement) {
      dispatch(addButtons([buttons.pause]))
    } else {
      dispatch(removeButtons([buttons.play, buttons.pause]))
    }
  }, [dispatch, playElement])
}

const useToggleButtons = (playElement) => {
  const [{ active }] = useStore((state) => state.buttons)
  const isPlaying = active === PLAY_BUTTON
  const isPause = active === PAUSE_BUTTON

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (playElement) {
      if (isPlaying) {
        playElement.play()
        dispatch(removeButtons([buttons.play]))
        dispatch(addButtons([buttons.pause]))
      }
      if (isPause) {
        playElement.pause()
        dispatch(removeButtons([buttons.pause]))
        dispatch(addButtons([buttons.play]))
      }
    }
  }, [dispatch, isPlaying, isPause, playElement])
}

export const usePlayTool = () => {
  const [playElement, setPlayElement] = useState(null)
  const playRef = useCallback((node) => {
    setPlayElement(node)
  }, [])

  useAddAndRemoveButtons(playElement)
  useToggleButtons(playElement)

  return {
    playRef,
  }
}