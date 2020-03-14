import React from 'react'
import { useMap, useMapMarkers } from './hooks'
import { useMapTools, buttons } from './tools'

const Map = () => {
  const id = 'mapId'
  const map = useMap(id)
  useMapMarkers(map)
  useMapTools(map)

  return <div id={id} style={{ height: '100%' }} />
}

Map.diory = {
  text: 'Map',
  image: 'map',
}

Map.buttons = buttons

export default Map
