import React from 'react'
import { useFocus } from '../diograph/hooks'

import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

import RoomsView from './RoomsView'

const Rooms = () => {
  useGetHomeEffect()
  useSaveHomeEffect()

  const { diory } = useFocus()
  return !diory && <RoomsView />
}

export default Rooms
