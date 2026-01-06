import React from 'react'
import { useSelector } from 'react-redux'

import { useDiories } from '../diograph/utils/useDiories'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/utils/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories'
import { useDispatchActions } from '../../store'
import { setDiographAddress } from '../diograph/diographActions'

import { FavoritesView } from './components/FavoritesView'
import { FavoritesNavigation } from './components/FavoritesNavigation'
import { useCreateDioryById } from '../tools/createDiory/useCreateDioryById'

const useReturnToHome = () => {
  const { dispatch } = useDispatchActions()
  return () => dispatch(setDiographAddress(null))
}

export const Favorites = () => {
  const favoritesDiory = useCreateDioryById('favorites') || {}
  const { story, memories } = useDiories(favoritesDiory.key)

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
