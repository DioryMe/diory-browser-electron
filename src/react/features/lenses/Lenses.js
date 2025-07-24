import React from 'react'

import { GraphLens } from './graph/GraphLens'
import { MapLens } from './map/MapLens'
import { TimelineLens } from './timeline/TimelineLens'
import { SearchLens } from './search/SearchLens'

export const Lenses = () => (
  <>
    <GraphLens />
    <MapLens />
    <TimelineLens />
    <SearchLens />
  </>
)
