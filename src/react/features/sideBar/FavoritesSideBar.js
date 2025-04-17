import React from 'react'

import { useKey } from './utils/useKey'
import { useSidebarData } from './utils/useSidebarData'

import { FavoritesView } from './components/FavoritesView'

export const FavoritesSideBar = () => {
  const favoritesKey = useKey('favorites')
  return <FavoritesView {...useSidebarData(favoritesKey)} />
}
