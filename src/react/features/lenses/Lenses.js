import React from 'react'

import GraphLens from './graph/GraphLens'
import MapLens from './map/MapLens'
// import TimelineLens from './timeline/TimelineLens'
import SearchLens from './search/SearchLens'

export const DEFAULT_LENS = 'search'

const Lenses = () => (
  <>
    <GraphLens />
    <MapLens />
    <SearchLens />
  </>
)

export default Lenses
