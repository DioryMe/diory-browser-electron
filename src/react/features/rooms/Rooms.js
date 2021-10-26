import React from 'react'
import { useStore } from '../../store'

import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

import RoomsView from './RoomsView'

const Rooms = () => {
  useGetHomeEffect()
  useSaveHomeEffect()

  const [{ loaded }] = useStore((state) => state.diograph)
  return !loaded && <RoomsView />
}

export default Rooms
