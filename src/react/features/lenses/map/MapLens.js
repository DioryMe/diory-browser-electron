import React from 'react'

import { useMap } from './hooks/useMap'
import { useMapBounds } from './hooks/useMapBounds'
import { useMapMarkers } from './hooks/useMapMarkers'
import { useSetFocus } from './hooks/useSetFocus'
import { useTogglePopup } from './hooks/useTogglePopup'

import { useAddLocation } from './buttons/useAddLocation'
import { useMoveLocation } from './buttons/useMoveLocation'
import { useRemoveLocation } from './buttons/useRemoveLocation'

const MapLens = ({ diory, diorys, activeButton }) => {
  const id = 'mapId'
  const map = useMap(id)

  useMapBounds(map, diory, diorys)

  useMapMarkers(map, diory, diorys)
  useSetFocus(map, diory, activeButton)
  useTogglePopup(map, activeButton)

  useAddLocation(map, diory, activeButton)
  useMoveLocation(map, activeButton)
  useRemoveLocation(map, diory, activeButton)

  return <div id={id} style={{ height: '100%' }} />
}

export default MapLens
