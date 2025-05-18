import React from 'react'

import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'
import { useSidebarData } from '../sideBar/utils/useSidebarData'

import { FavoritesView } from './components/FavoritesView'

// TODO initialise favorites to diograph

export const Favorites = () => {
  const favoritesKey = useHomeDiographKey('favorites')
  return <FavoritesView {...useSidebarData(favoritesKey)} />
}
