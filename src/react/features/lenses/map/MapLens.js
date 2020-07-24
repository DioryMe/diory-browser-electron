import React from 'react'
import Fullscreen from '../../../components/Fullscreen'

import { useMap } from './hooks/useMap'
import { useMapMarkers } from './hooks/useMapMarkers'
import { useSetFocus } from './hooks/useSetFocus'
import { useTogglePopup } from './hooks/useTogglePopup'

const MapLens = () => {
  const id = 'mapId'

  const map = useMap(id)
  useMapMarkers(map)
  useSetFocus(map)
  useTogglePopup(map)

  return (
    <Fullscreen marginTop={48} zIndex={10}>
      <div id={id} style={{ height: '100%' }} />
    </Fullscreen>
  )
}

MapLens.diory = {
  text: 'Map',
  image: 'map',
}

export default MapLens
