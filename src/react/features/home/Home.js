import React from 'react'
import { useSelector } from '../../store'
import { useHomeDiographEffect } from './useHomeDiographEffect'
import { useGetHomeConnection } from './useGetHomeConnection'

import HomeView from './HomeView'

export const Home = () => {
  useGetHomeConnection()
  useHomeDiographEffect()

  const { initializing, homeConnection } = useSelector((state) => state.home)
  return homeConnection ? null : <HomeView initializing={initializing} />
}
