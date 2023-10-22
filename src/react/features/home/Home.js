import React from 'react'
import { useGetHomeEffect } from './useGetHomeEffect'
import { useSelector } from '../../store'
import HomeView from './HomeView'
import SetHomeRoomButton from './HomeRoomButton'

export const Home = () => {
  useGetHomeEffect()

  const { initializing, address } = useSelector((state) => state.home)
  return !address ? <HomeView>{!initializing ? <SetHomeRoomButton /> : null}</HomeView> : null
}
