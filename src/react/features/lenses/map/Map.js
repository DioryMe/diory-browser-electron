import React from 'react';
import { useMap, useMapMarkers } from './hooks'
import { useSaveRoom} from '../../room/hooks'

const Map = () => {
  useSaveRoom()

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
