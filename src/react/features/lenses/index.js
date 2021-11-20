import React from 'react'

import Fullscreen from '../../components/Fullscreen'
import GridLens from './grid/GridLens'
import TimelineLens from './timeline/TimelineLens'
import MapLens from './map/MapLens'

const Lenses = (props) => (
  <Fullscreen marginTop={48} {...props}>
    <GridLens />
    <TimelineLens />
    <MapLens />
  </Fullscreen>
)

export default Lenses
