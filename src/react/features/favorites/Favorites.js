import React from 'react'

import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'
import { useSidePanelActions } from '../sidePanel/useSidePanelActions'

import { FavoritesView } from './components/FavoritesView'
import { useDiories } from '../diograph/utils/useDiories'
import { useInitialiseDiory } from '../diograph/utils/useInitialiseDiory'

export const Favorites = () => {
  useInitialiseDiory('favorites')

  const favoritesKey = useHomeDiographKey('favorites')
  const favoritesDiories = useDiories(favoritesKey)
  const actions = useSidePanelActions(favoritesDiories)

  return <FavoritesView {...favoritesDiories} {...actions} />
}
