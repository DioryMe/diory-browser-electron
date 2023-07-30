import React from 'react'

import Fullscreen from '../../components/Fullscreen'
import GraphLens from './graph/GraphLens'
import MapLens from './map/MapLens'
import TimelineLens from './timeline/TimelineLens'
import Search from './search/Search'

const Lenses = (props) => (
  <Fullscreen {...props}>
    <GraphLens />
    <MapLens />
    <TimelineLens />
    <Search />
  </Fullscreen>
)

export default Lenses
