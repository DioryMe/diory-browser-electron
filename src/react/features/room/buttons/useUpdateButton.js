import { useEffect } from 'react'
import { useDispatch } from '../../../store'
import { useButtons } from '../../buttons'
import { useTools } from '../../tools/hooks'

import { setInactive } from '../../tools/actions'
import { setUpdateRoom } from '../actions'

const UPDATE_ROOM_BUTTON = 'UPDATE_ROOM_BUTTON'
const buttons = [
  {
    id: UPDATE_ROOM_BUTTON,
    text: 'Save',
    data: {
      icon: 'floppy-disk',
    },
  },
]

export const useUpdateButton = () => {
  useButtons(buttons)

  const { active } = useTools()

  const dispatch = useDispatch()
  useEffect(() => {
    if (UPDATE_ROOM_BUTTON === active) {
      dispatch(setUpdateRoom())
      dispatch(setInactive())
    }
  }, [active, dispatch])
}
