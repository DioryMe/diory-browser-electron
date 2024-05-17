import React from 'react'
import { useSelector } from '../../store'
import HomeView from './HomeView'

export const Home = () => {
  const { initializing, address } = useSelector((state) => state.home)
  return address ? null : <HomeView initializing={initializing} />
}
