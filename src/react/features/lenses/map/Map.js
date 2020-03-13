import React from 'react'
import { useMap, useMapMarkers } from './hooks'
import { useMapOperations, buttons } from './operations'

const Map = () => {
  const id = 'mapId'
  const map = useMap(id)
  useMapMarkers(map)
  useMapOperations(map)

  return <div id={id} style={{ height: '100%' }} />
}

Map.diory = {
  text: 'Map',
  image: 'map',
}

Map.buttons = buttons

export default Map
