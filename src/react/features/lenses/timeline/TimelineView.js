import React from 'react'
import PropTypes from 'prop-types'

import { useDragging } from '../utils/markers/useDragging'
import { useMarkers } from '../utils/markers/useMarkers'
import { useLinkIcons } from './hooks/useLinkIcons'

import { useTimeline } from './hooks/useTimeline'
import { useTimelineBounds } from './hooks/useTimelineBounds'

import { usePopups } from '../utils/popup/usePopups'
import { useScale } from './scale/useScale'

import { usePopupClick } from '../utils/popup/usePopupClick'
import { useTimelineClick } from './hooks/useTimelineClick'

import { getIsoDate, getTimelineData } from './hooks/getTimelineData'

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
  fitToBounds,
  onBoundsChange,
}) => {
  const timelineId = 'timelineId'
  const timeline = useTimeline(timelineId)

  console.log(activeButton)
  usePopupClick(timeline, onPopupClick, activeButton)

  const timelineData = getTimelineData({ diory, diorys })

  useTimelineBounds(timeline, timelineData.diory, fitToBounds, onBoundsChange)
  const markers = useMarkers(timeline, null, timelineData.diorys)
  useLinkIcons(timeline, markers.linkMarkers, diory)

  usePopups(timeline, markers, null, diorys)

  useScale(timeline)

  useTimelineClick(timeline, onMapClick)
  useDragging(timeline, enableDragging, ({ id, longitude }) => {
    onDragEnd({ id, date: getIsoDate(longitude) })
  })

  return (
    <BackgroundDiory diory={diory} gradient gradientRgba="0, 0, 0, 0.2">
      <Fullscreen id={timelineId} background="transparent" style={{ top: '48px' }} />
    </BackgroundDiory>
  )
}

TimelineView.defaultProps = {
  enableDragging: false,
  onMapClick: () => {},
  onPopupClick: () => {},
  onDragEnd: () => {},
}

TimelineView.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  enableDragging: PropTypes.bool,
  onMapClick: PropTypes.func,
  onPopupClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  fitToBounds: PropTypes.func,
  onBoundsChange: PropTypes.func,
}

export default TimelineView
