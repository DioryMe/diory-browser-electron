import React from 'react'

import Fullscreen from '../../components/Fullscreen'
import { useFocusDiory } from '../room/hooks'
import FullscreenLens from './fullscreen/FullscreenLens'
import GridLens from './grid/GridLens'
import MapLens from './map/MapLens'

const Lenses = () => {
  const { diory } = useFocusDiory()
  return diory ? (
    <Fullscreen marginTop={48} zIndex={10}>
      <GridLens />
      <MapLens />
      <FullscreenLens />
    </Fullscreen>
  ) : null
}

export default Lenses
