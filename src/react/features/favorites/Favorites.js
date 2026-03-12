import React from 'react'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { useOnDioryClick } from '../tools/useOnDioryClick'
import { useOnCheckboxClick } from '../tools/useOnCheckboxClick'
import { useLinkDiories } from '../tools/actions/linkDiories'

import { FavoritesView } from './components/FavoritesView'

// TODO add timeline etc. to sidebar
export const Favorites = ({ diograph, createDiory }) => {
  const favoritesDiory = createDiory({ id: 'favorites', text: 'Favorites', links: [{ id: 'timeline' }, { id: 'map' }, { id: 'graph' }] })
  const { story, memories } = getStoryDiories(favoritesDiory.key, diograph)

  return (
    <>
      <FavoritesView
        story={story}
        memories={memories}
        onClick={useOnDioryClick()}
        onSelect={useOnCheckboxClick()}
        onDrop={useLinkDiories()}
        onBackgroundDrop={useLinkDiories()}
      />
    </>
  )
}
