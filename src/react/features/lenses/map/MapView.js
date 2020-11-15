import React from 'react'

import { useMap } from './hooks/useMap'
import { useMapBounds } from './hooks/useMapBounds'

import { useMarkers } from '../utils/markers/useMarkers'
import { usePopups } from '../utils/popup/usePopups'

import { usePopupClick } from '../utils/popup/usePopupClick'
import { useMapClick } from './hooks/useMapClick'
import { useDragging } from '../utils/markers/useDragging'

import { getLocationData } from './hooks/getLocationData'

const MapView = ({
  diory,
  diorys,
  onMapClick,
  onPopupClick,
  enableDragging,
  onDragEnd,
}) => {
  const id = 'mapId'
  const map = useMap(id)

  usePopupClick(map, onPopupClick)

  const locationData = getLocationData({ diory, diorys })

  useMapBounds(map, locationData.diory)
  const markers = useMarkers(map, locationData.diory, locationData.diorys)
  usePopups(map, markers, diory, diorys)

  useMapClick(map, onMapClick)
  useDragging(map, enableDragging, onDragEnd)

  return <div id={id} style={{ height: '100%' }} />
}

export default MapView
