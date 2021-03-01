import React from 'react'

import GridLens from './grid/GridLens'
import MapLens from './map/MapLens'
import TimelineLens from './timeline/TimelineLens'
import FullscreenLens from './fullscreen/FullscreenLens'

const Lenses = () => (
  <>
    <GridLens />
    <MapLens />
    <TimelineLens />
    <FullscreenLens />
  </>
)

export default Lenses
