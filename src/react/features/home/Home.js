import React from 'react'
import { useSelector } from '../../store'
import HomeView from './HomeView'
import SetHomeRoomButton from './SetHomeButton'

export const Home = () => {
  const { initializing, address } = useSelector((state) => state.home)
  return !address ? <HomeView>{!initializing ? <SetHomeRoomButton /> : null}</HomeView> : null
}
