import React from 'react'

import { useMap } from './hooks/useMap'
import { useMapMarkers } from './hooks/useMapMarkers'
import { useSetFocus } from './hooks/useSetFocus'
import { useTogglePopup } from './hooks/useTogglePopup'

import { useAddLocation } from './tools/useAddLocation'
import { useMoveLocation } from './tools/useMoveLocation'
import { useRemoveLocation } from './tools/useRemoveLocation'

import buttons from './tools/buttons'

const Map = () => {
  const id = 'mapId'

  const map = useMap(id)
  useMapMarkers(map)
  useSetFocus(map)
  useTogglePopup(map)

  useAddLocation(map)
  useMoveLocation(map)
  useRemoveLocation(map)

  return <div id={id} style={{ height: '100%' }} />
}

Map.diory = {
  text: 'Map',
  image: 'map',
}

Map.buttons = buttons

export default Map
