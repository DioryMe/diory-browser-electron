import React from 'react'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { useOnDioryClick } from '../tools/useOnDioryClick'
import { useOnCheckboxClick } from '../tools/useOnCheckboxClick'
import { useLinkDiories } from '../tools/actions/linkDiories'
import { useDispatchActions } from '../../store'

import { setIsHome } from '../home/homeActions'

import { FavoritesView } from './components/FavoritesView'
import { FavoritesNavigation } from './components/FavoritesNavigation'

const useReturnToHome = () => {
  const { dispatch } = useDispatchActions()
  return () => {
    dispatch(setIsHome(true))
  }
}

export const Favorites = ({ diograph, createDiory }) => {
  const favoritesDiory = createDiory({ id: 'favorites' })
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
