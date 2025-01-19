import React from 'react'
import PropTypes from 'prop-types'

import { useMap } from './hooks/useMap'
import { useMapBounds } from './hooks/useMapBounds'

import { useMarkers } from '../utils/markers/useMarkers'
import { usePopups } from '../utils/popup/usePopups'

import { usePopupClick } from '../utils/popup/usePopupClick'
import { useMapClick } from './hooks/useMapClick'
import { useDragging } from '../utils/markers/useDragging'

import { getLocationData } from './hooks/getLocationData'

const MapView = ({ story, memories, onMapClick, onPopupClick, enableDragging, onDragEnd }) => {
  const id = 'mapId'
  const map = useMap(id)

  usePopupClick(map, onPopupClick)

  const locationData = getLocationData({ story, memories })

  useMapBounds(map, locationData.story)
  const markers = useMarkers(map, locationData.story, locationData.memories)

  usePopups(map, markers, story, memories)

  useMapClick(map, onMapClick)
  useDragging(map, enableDragging, onDragEnd)

  return <div id={id} style={{ height: '100%' }} />
}

MapView.defaultProps = {
  onMapClick: () => {},
  onPopupClick: () => {},
  enableDragging: () => {},
  onDragEnd: () => {},
}

MapView.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onMapClick: PropTypes.func,
  onPopupClick: PropTypes.func,
  enableDragging: PropTypes.func,
  onDragEnd: PropTypes.func,
}

export default MapView
