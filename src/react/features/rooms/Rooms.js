import React from 'react'
import { useDiograph } from '../diograph/hooks'

import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

import RoomsView from './RoomsView'

const Rooms = () => {
  useGetHomeEffect()
  useSaveHomeEffect()

  const { story } = useDiograph()
  return !story && <RoomsView />
}

export default Rooms
