import React from 'react'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Fullscreen from '../../../components/Fullscreen'
import { getDioryTimelineData, getLinksTimelineData } from './hooks/getTimelineData'

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

  const dioryTimelineData = getDioryTimelineData({ diory, diorys })
  useMapBounds(map, dioryTimelineData)

  const linkLocationsData = getLinksTimelineData({ diory, diorys })
  const linkMarkers = useLinkMarkers(map, linkLocationsData)
  useLinkPopups(linkMarkers, diorys)
  useUpdatePopup(map)

  useScale(map)

  useSetFocus(map, diory.id, activeButton, actions)
  useAddLocation(map, diory.id, activeButton, actions)
  useMoveLocation(map, activeButton, actions)
  useRemoveLocation(map, diory.id, activeButton, actions)

  return (
    <BackgroundDiory diory={diory} gradient gradientRgba="0, 0, 0, 0.2">
      <Fullscreen id={id} background="transparent" />
    </BackgroundDiory>
  )
}

export default TimelineView
