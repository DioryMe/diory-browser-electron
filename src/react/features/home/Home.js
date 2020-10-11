import React from 'react'
import { useFocusDiory } from '../room/hooks'

import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

import HomeView from './HomeView'

const Home = () => {
  useGetHomeEffect()
  useSaveHomeEffect()

  const { diory } = useFocusDiory()
  return !diory && <HomeView />
}

export default Home
