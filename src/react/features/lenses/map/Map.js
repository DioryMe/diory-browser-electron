import React from 'react';
import { useMapMarkers } from './useMapMarkers'
import { useMap } from './useMap'

const Map = () => {
  const id = 'mapId'
  const map = useMap(id)
  useMapMarkers(map)

  return <div id={id} style={{ height: '100%' }}/>
}

Map.diory = {
  text: 'Map',
  image: 'map',
}

export default Map
