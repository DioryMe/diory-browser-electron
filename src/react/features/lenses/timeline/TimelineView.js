import React from 'react'
import { useDragging } from '../utils/markers/useDragging'
import { useMarkers } from '../utils/markers/useMarkers'
import { useLinkIcons } from './hooks/useLinkIcons'

import { useTimeline } from './hooks/useTimeline'
import { useTimelineBounds } from './hooks/useTimelineBounds'

import { usePopups } from '../utils/popup/usePopups'
import { useScale } from './scale/useScale'

import { useLinkMarkers } from '../utils/markers/useLinkMarkers'
import { usePopupClick } from '../utils/popup/usePopupClick'

import { useTimelineClick } from './hooks/useTimelineClick'

import { getIsoDate, getLocationData } from './hooks/getLocationData'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Fullscreen from '../../../components/Fullscreen'

const TimelineView = ({
  diory,
  diorys,
  activeButton,
  onMapClick,
  onPopupClick,
  enableDragging,
  onDragEnd,
}) => {
  const id = 'timelineId'
  const timeline = useTimeline(id)

  usePopupClick(timeline, onPopupClick, activeButton)

  const locationData = getLocationData({ diory, diorys })

  useTimelineBounds(timeline, locationData.diory)

  const markers = useMarkers(timeline, null, locationData.diorys, enableDragging, onDragEnd)
  useLinkIcons(timeline, markers.linkMarkers, diory)

  usePopups(timeline, markers, null, diorys)
  useScale(timeline)

  useTimelineClick(timeline, onMapClick)
  useDragging(timeline, enableDragging, ({ id, longitude }) => {
    onDragEnd({ id, date: getIsoDate(longitude)})
  })

  return (
    <BackgroundDiory diory={diory} gradient gradientRgba="0, 0, 0, 0.2">
      <Fullscreen id={id} background="transparent" />
    </BackgroundDiory>
  )
}

export default TimelineView
