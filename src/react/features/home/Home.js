import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../store'
import { useButtons } from '../buttons'
import { useFocusDiory } from '../room/hooks'
import { removeRoom } from './actions'

import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

import { enterRoom, setFocus } from '../navigation/actions'

import Room from '../../components/Room'

import { buttons, REMOVE_ROOM } from './buttons'

const useHome = () => {
  const [{ rooms }, dispatch] = useStore((state) => state.home)
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

const Home = () => {
  useButtons(buttons)

  useGetHomeEffect()
  useSaveHomeEffect()

  const { diory } = useFocusDiory()
  const { rooms } = useHome()
  return (
    !diory && (
      <Pane height="100%" display="flex" flexWrap="wrap" padding={24}>
        {rooms.map((room) => (
          <Room {...room} />
        ))}
      </Pane>
    )
  )
}

export default Home
