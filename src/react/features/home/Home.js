import React from 'react'
import { useSelector } from '../../store'
import HomeView from './HomeView'

export const Home = () => {
  const { initializing, connection } = useSelector((state) => state.home)
  return connection ? null : <HomeView initializing={initializing} />
}
