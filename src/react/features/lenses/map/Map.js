import React from 'react';
import { useSaveRoom} from '../../room/hooks'
import { useMap, useMapMarkers } from './hooks'
import { useMapOperations, operations } from './operations'

const Map = () => {
  useSaveRoom()

  const id = 'mapId'
  const map = useMap(id)
  useMapMarkers(map)
  useMapOperations(map)

  return <div id={id} style={{ height: '100%' }}/>
}

Map.diory = {
  text: 'Map',
  image: 'map',
}

Map.operations = operations

export default Map
