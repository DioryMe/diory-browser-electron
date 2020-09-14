import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../store'
import { useFocusDiory } from '../room/hooks'

import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

import { enterRoom, setFocus } from '../navigation/actions'

import Room from '../../components/Room'
import BackgroundDiory from '../../components/diories/BackgroundDiory'

const useHome = () => {
  const [{ rooms }, dispatch] = useStore((state) => state.home)
  return {
    rooms: Object.entries(rooms).map(([id, diory]) => ({
      diory,
      onClick: () => {
        dispatch(enterRoom({ id }))
        dispatch(setFocus({ focus: diory.id }))
      },
    })),
  }
}

const Home = () => {
  const { diory } = useFocusDiory()
  useGetHomeEffect()
  useSaveHomeEffect()

  const { image, rooms } = useHome()
  return (
    !diory && (
      <Pane height="100%" display="flex" flexWrap="wrap" padding={24}>
        <BackgroundDiory diory={{ image }} zIndex={-1} />
        {rooms.map((room) => (
          <Room {...room} />
        ))}
      </Pane>
    )
  )
}

export default Home
