import React from 'react'

import { selectStory } from '../navigation/navigationActions'

import DiographFavorites from '../../components/diograph/DiographFavorites'

const favorites = [
  {
    id: '',
    text: 'people',
  },
  {
    id: '',
    text: 'places',
  },
  {
    id: '',
    text: 'moments',
  },
]

export const DiorySideNavigation = () => (
  <DiographFavorites favorites={favorites} selectStory={selectStory} />
)
