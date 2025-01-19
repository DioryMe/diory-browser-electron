import React from 'react'

import { selectStory } from './diosphereActions'

import DiographFavorites from '../../components/diograph/DiographFavorites'

const favorites = [
  {
    id: '',
    text: 'MacBook Pro',
  },
  {
    id: '',
    text: 'SSD',
  },
  {
    id: '',
    text: 'S3',
  },
]

export const DiosphereSideNavigation = () => (
  <DiographFavorites favorites={favorites} selectStory={selectStory} />
)
