import React from 'react'

import { useMap } from './hooks/useMap'
import { useMapMarkers } from './hooks/useMapMarkers'
import { useSetFocus } from './hooks/useSetFocus'
import { useTogglePopup } from './hooks/useTogglePopup'

const Map = () => {
  const id = 'mapId'

  const map = useMap(id)
  useMapMarkers(map)
  useSetFocus(map)
  useTogglePopup(map)

  return <div id={id} style={{ height: '100%' }} />
}

Map.diory = {
  text: 'Map',
  image: 'map',
}

export default Map
