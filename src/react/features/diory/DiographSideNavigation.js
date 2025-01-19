import React from 'react'

import { selectStory } from './navigationActions'

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

export const DiographSideNavigation = () => (
  <DiographFavorites favorites={favorites} selectStory={selectStory} />
)
