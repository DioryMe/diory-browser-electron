import React from 'react'
import { useStore } from '../../../store'
import MapView from './MapView'

const MAP_LENS = 'map'

const MapLens = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  return selectedLensId === MAP_LENS && <MapView />
}

MapLens.diory = {
  text: 'Map',
  image: 'map',
}

export default MapLens
