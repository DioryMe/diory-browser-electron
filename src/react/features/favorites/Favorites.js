import React from 'react'

import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'
import { useSidebarData } from '../sideBar/utils/useSidebarData'

import { FavoritesView } from './components/FavoritesView'
import { useStoryDiories } from '../diograph/utils/useDiories'
import { useInitialiseDiory } from '../diograph/utils/useInitialiseDiory'

export const Favorites = () => {
  useInitialiseDiory('favorites')

  const storyKey = useHomeDiographKey('favorites')
  const { story, memories } = useStoryDiories({ storyKey })

  return <FavoritesView {...useSidebarData({ story, memories })} />
}
