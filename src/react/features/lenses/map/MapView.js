import React from 'react'

import { useMap } from './hooks/useMap'
import { useMapMarkers } from './hooks/useMapMarkers'
import { useSetFocus } from './hooks/useSetFocus'
import { useTogglePopup } from './hooks/useTogglePopup'

import { useAddLocation } from './buttons/useAddLocation'
import { useMoveLocation } from './buttons/useMoveLocation'
import { useRemoveLocation } from './buttons/useRemoveLocation'

const MapView = () => {

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

export default MapView
