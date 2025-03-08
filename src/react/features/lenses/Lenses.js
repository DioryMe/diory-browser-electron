import React from 'react'

import { GraphLens } from './GraphLens'
import { MapLens } from './MapLens'
// import TimelineLens from './timeline/TimelineLens'
import { SearchLens } from './SearchLens'

export const DEFAULT_LENS = null

export const Lenses = () => (
  <>
    <GraphLens />
    <MapLens />
    <SearchLens />
  </>
)
