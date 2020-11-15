import React from 'react'
import { useMarkers } from '../utils/markers/useMarkers'
import { getLinksLocationData, getLocationData } from './hooks/getLocationData'
import { useLinkMarkers } from '../utils/markers/useLinkMarkers'

import { useMap } from './hooks/useMap'
import { useMapBounds } from './hooks/useMapBounds'

import { usePopups } from '../utils/popup/usePopups'
import { useDioryMarker } from '../utils/markers/useDioryMarker'
import { useDragging } from '../utils/markers/useDragging'


import { usePopupClick } from '../utils/popup/usePopupClick'
import { useMapClick } from './hooks/useMapClick'

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

  const markers = useMarkers(map, locationData.diory, locationData.diorys, enableDragging, onDragEnd)

  usePopups(map, markers, diory, diorys)

  useMapClick(map, onMapClick)

  return <div id={id} style={{ height: '100%' }} />
}

export default MapView
