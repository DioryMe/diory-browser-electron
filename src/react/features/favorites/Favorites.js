import React from 'react'
import { useSelector } from 'react-redux'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { useDiograph } from '../diograph/utils/useDiograph'
import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/utils/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories'
import { useDispatchActions } from '../../store'
import { useCreateDioryById } from '../tools/createDiory/useCreateDioryById'

import { setIsHome } from '../home/homeActions'

import { FavoritesView } from './components/FavoritesView'
import { FavoritesNavigation } from './components/FavoritesNavigation'

const useReturnToHome = () => {
  const { dispatch } = useDispatchActions()
  return () => {
    dispatch(setIsHome(true))
  }
}

export const Favorites = () => {
  const { diograph } = useDiograph()
  const favoritesDiory = useCreateDioryById('favorites', diograph) || {}
  const { story, memories } = getStoryDiories(favoritesDiory.key, diograph)

  const { address } = useSelector((state) => state.diograph)

  return (
    <>
      <FavoritesNavigation
        diory={{ text: 'DIORY', key: address }}
        onLogout={useReturnToHome()}
        onDioryClick={useSelectStory()}
      />
      <FavoritesView
        story={story}
        memories={memories}
        onClick={useSelectStory()}
        onSelect={useSelectDiory()}
        onDrop={useLinkDiories()}
        onBackgroundDrop={useLinkDiories()}
      />
    </>
  )
}
