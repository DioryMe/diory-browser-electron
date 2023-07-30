import React from 'react'

import GraphLens from './graph/GraphLens'
import MapLens from './map/MapLens'
import TimelineLens from './timeline/TimelineLens'
import Search from './search/Search'

const Lenses = () => (
  <>
    <GraphLens />
    <MapLens />
    <TimelineLens />
    <Search />
  </>
)

export default Lenses
