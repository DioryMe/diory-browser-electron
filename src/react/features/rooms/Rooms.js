import React from 'react'
import { useFocusDiory } from '../diograph/hooks'

import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

import RoomsView from './RoomsView'

const Rooms = () => {
  useGetHomeEffect()
  useSaveHomeEffect()

  const { diory } = useFocusDiory()
  return !diory && <RoomsView />
}

export default Rooms
