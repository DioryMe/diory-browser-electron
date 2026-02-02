import React from 'react'
import { useSelector } from 'react-redux'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { useDiograph } from '../diograph/utils/useDiograph'
import { useOnSelectStory } from '../tools/onSelectStory'
import { useOnSelectDiory } from '../tools/onSelectDiory/useOnSelectDiory'
import { useLinkDiories } from '../tools/actions/linkDiories'
import { useDispatchActions } from '../../store'
import { useCreateDioryById } from '../tools/actions/createDiory/useCreateDioryById'

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
        onDioryClick={useOnSelectStory()}
      />
      <FavoritesView
        story={story}
        memories={memories}
        onClick={useOnSelectStory()}
        onSelect={useOnSelectDiory()}
        onDrop={useLinkDiories()}
        onBackgroundDrop={useLinkDiories()}
      />
    </>
  )
}
