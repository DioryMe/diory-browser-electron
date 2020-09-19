import React from 'react'
import { getTimelineData } from './hooks/getTimelineData'

import { useMap } from './hooks/useMap'
import { useMapBounds } from './hooks/useMapBounds'
import { useFocusMarker, useLinkMarkers } from './hooks/useMapMarkers'
import { useDioryPopup, useDiorysPopups, useUpdatePopup } from './hooks/useMapPopups'
import { useSetFocus } from './hooks/useSetFocus'

import { useAddLocation } from './tools/useAddLocation'
import { useMoveLocation } from './tools/useMoveLocation'
import { useRemoveLocation } from './tools/useRemoveLocation'

const TimelineView = ({ diory, diorys, activeButton, actions }) => {
  const id = 'mapId'
  const map = useMap(id)

  const locationData = getTimelineData({ diory, diorys })
  useMapBounds(map, locationData)

  const focusMarker = useFocusMarker(map, locationData)
  useDioryPopup(focusMarker, diory)

  const markerLocations = diorys.map((child) =>
    getTimelineData({ diory: child, diorys, parent: diory })
  )
  const linkMarkers = useLinkMarkers(map, markerLocations)
  useDiorysPopups(linkMarkers, diorys)

  useUpdatePopup(map)

  useSetFocus(map, diory.id, activeButton, actions)
  useAddLocation(map, diory.id, activeButton, actions)
  useMoveLocation(map, activeButton, actions)
  useRemoveLocation(map, diory.id, activeButton, actions)

  return <div id={id} style={{ height: '100%' }} />
}

export default TimelineView
