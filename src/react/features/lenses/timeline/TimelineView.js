import React from 'react'
import Image from '../../../components/diories/Image'
import Fullscreen from '../../../components/Fullscreen'
import { getTimelineData } from './hooks/getTimelineData'

import { useMap } from './hooks/useMap'
import { useMapBounds } from './hooks/useMapBounds'

import { useLinkMarkers } from './hooks/useMapMarkers'
import { useLinkPopups, useUpdatePopup } from './hooks/useMapPopups'

import { useScale } from './hooks/useScale'

import { useSetFocus } from './hooks/useSetFocus'
import { useAddLocation } from './tools/useAddLocation'
import { useMoveLocation } from './tools/useMoveLocation'
import { useRemoveLocation } from './tools/useRemoveLocation'

const TimelineView = ({ diory, diorys, activeButton, actions }) => {
  const id = 'timelineId'
  const map = useMap(id)

  const locationData = getTimelineData({ diory, diorys })
  useMapBounds(map, locationData)

  const linkLocations = diorys.map((child) =>
    getTimelineData({ diory: child, diorys, parent: diory })
  )
  const linkMarkers = useLinkMarkers(map, linkLocations)
  useLinkPopups(linkMarkers, diorys)

  useScale(map)

  useUpdatePopup(map)

  useSetFocus(map, diory.id, activeButton, actions)
  useAddLocation(map, diory.id, activeButton, actions)
  useMoveLocation(map, activeButton, actions)
  useRemoveLocation(map, diory.id, activeButton, actions)

  return (
    <Image {...diory} gradient gradientRgba="0, 0, 0, 0.2">
      <Fullscreen id={id} background="transparent" />
    </Image>
  )
}

export default TimelineView
