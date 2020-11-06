import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../store'
import { useButtons } from '../buttons'
import { removeRoom } from './actions'

import { enterRoom, setFocus } from '../navigation/actions'

import Room from '../../components/Room'

import { buttons, REMOVE_ROOM } from './buttons'

const useHome = () => {
  const [{ rooms }, dispatch] = useStore((state) => state.rooms)
  const [{ active }] = useStore((state) => state.buttons)

  return {
    rooms: Object.entries(rooms).map(([id, diory]) => ({
      diory,
      onClick: () => {
        switch (active) {
          case REMOVE_ROOM:
            dispatch(removeRoom({ id }))
            break
          default:
            dispatch(enterRoom({ id }))
            dispatch(setFocus({ focus: diory.id }))
        }
      },
    })),
  }
}

const RoomsView = () => {
  useButtons(buttons)
  const { rooms } = useHome()
  return (
    <Pane height="100%" display="flex" flexWrap="wrap" padding={24}>
      {rooms.map((room) => (
        <Room {...room} />
      ))}
    </Pane>
  )
}

export default RoomsView
