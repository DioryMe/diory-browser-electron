import React from 'react'
import { useSelector } from '../../store'
import HomeView from './HomeView'

export const Home = () => {
  const { initializing } = useSelector((state) => state.home)
  const { loaded } = useSelector((state) => state.diory)
  return loaded ? null : <HomeView initializing={initializing} />
}
