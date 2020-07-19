import { useEffect } from 'react'
import { useDispatch } from '../../store'
import { addButtons, removeButtons } from '../buttons/actions'

export const OPEN_ROOM_BUTTON = 'OPEN_ROOM_BUTTON'

const buttons = [
  {
    id: OPEN_ROOM_BUTTON,
    text: 'Open room',
    data: {
      icon: 'folder-open',
    },
  },
]

export const useButtons = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addButtons(buttons))
    return () => dispatch(removeButtons(buttons))
  }, [])
}
