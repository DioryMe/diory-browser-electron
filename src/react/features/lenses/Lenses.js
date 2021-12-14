import React from 'react'

import Fullscreen from '../../components/Fullscreen'
import GridLens from './grid/GridLens'
import TimelineLens from './timeline/TimelineLens'
import MapLens from './map/MapLens'

const Lenses = (props) => (
  <Fullscreen {...props}>
    <GridLens />
    <TimelineLens />
    <MapLens />
  </Fullscreen>
)

export default Lenses
