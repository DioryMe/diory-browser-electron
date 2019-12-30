import React from 'react';
import { useMap, useDioryMarker, useDiorysMarkers } from './hooks'

const Map = () => {
  const id = 'mapId'
  const map = useMap(id)
  useDioryMarker(map)
  useDiorysMarkers(map)

  return <div id={id} style={{ height: '100%' }}/>
}

Map.diory = {
  text: 'Map',
  image: 'map',
}

export default Map
