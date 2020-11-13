import React from 'react'

import { useMap } from './hooks/useMap'

import { useMapBounds } from './hooks/useMapBounds'
import { useMapMarkers } from './hooks/useMapMarkers'
import { useTogglePopup } from './hooks/useTogglePopup'

import { usePopupClick } from './hooks/usePopupClick'
import { useMapClick } from './hooks/useMapClick'
import { useMarkerClick } from './hooks/useMarkerClick'
import { useDragging } from './hooks/useDragging'

const MapView = ({
  diory,
  diorys,
  activeButton,
  onMapClick,
  onMarkerClick,
  onPopupClick,
  enableDragging,
  onDragEnd
}) => {
  const id = 'mapId'
  const map = useMap(id)

  usePopupClick(map, onPopupClick)

  useMapBounds(map, diory, diorys)
  useMapMarkers(map, diory, diorys)
  useTogglePopup(map, diory, activeButton)

  useMapClick(map, onMapClick)
  useMarkerClick(map, diory, onMarkerClick)
  useDragging(map, enableDragging, onDragEnd)

  return <div id={id} style={{ height: '100%' }} />
}

export default MapView
