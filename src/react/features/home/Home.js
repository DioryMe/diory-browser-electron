import React from 'react'
import { useSelector } from '../../store'
import HomeView from './HomeView'

export const Home = () => {
  const { initializing, address, client } = useSelector((state) => state.home)
  return address && client ? null : <HomeView initializing={initializing} />
}
