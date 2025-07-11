import React from 'react'

import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'
import { useSidePanelActions } from '../sidePanel/useSidePanelActions'

import { FavoritesView } from './components/FavoritesView'
import { useStoryDiories } from '../diograph/utils/useDiories'
import { useInitialiseDiory } from '../diograph/utils/useInitialiseDiory'

export const Favorites = () => {
  useInitialiseDiory('favorites')

  const storyKey = useHomeDiographKey('favorites')
  const storyDiories = useStoryDiories({ storyKey })
  const actions = useSidePanelActions(storyDiories)

  return <FavoritesView {...storyDiories} {...actions} />
}
