import React from 'react'
import { useSelector } from '../../store'
import { useGetHomeConnectionEffect } from './useGetHomeConnectionEffect'
import { useHomeEffect } from './useHomeEffect'

import HomeView from './HomeView'

export const Home = () => {
  useGetHomeConnectionEffect()
  useHomeEffect()

  const { initializing, address } = useSelector((state) => state.home)
  return address ? null : <HomeView initializing={initializing} />
}
