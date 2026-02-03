import React from 'react'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { useDiograph } from '../diograph/utils/useDiograph'
import { useOnDioryClick } from '../tools/useOnDioryClick'
import { useOnCheckboxClick } from '../tools/useOnCheckboxClick'
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

  return (
    <>
      <FavoritesNavigation onLogout={useReturnToHome()} />
      <FavoritesView
        story={story}
        memories={memories}
        onClick={useOnDioryClick()}
        onSelect={useOnCheckboxClick({ diograph })}
        onDrop={useLinkDiories()}
        onBackgroundDrop={useLinkDiories()}
      />
    </>
  )
}
