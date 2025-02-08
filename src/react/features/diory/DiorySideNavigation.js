import React from 'react'

import { setDiographConnection } from '../home/homeActions'

import DiographFavorites from '../../components/diograph/DiographFavorites'
import { selectStory } from '../navigation/navigationActions'

const favorites = {
  'LocalClient/public/diory': {
    id: 'diory',
    text: 'Diory',
  },
  'LocalClient/public/diosphere': {
    id: 'diosphere',
    text: 'Diosphere',
  },
  'LocalClient/public/diosphere/google-drive': {
    id: '155c4c2b-2af1-43d3-bd39-f8e8475c1388',
    text: 'Google Drive',
  },
}

export const DiorySideNavigation = () => (
  <DiographFavorites
    favorites={favorites}
    setStore={setDiographConnection}
    selectStory={selectStory}
  />
)
