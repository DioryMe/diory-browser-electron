import React from 'react'
import { useStory } from '../diograph/hooks'

import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

import RoomsView from './RoomsView'

const Rooms = () => {
  useGetHomeEffect()
  useSaveHomeEffect()

  const { story } = useStory()
  return !story && <RoomsView />
}

export default Rooms
