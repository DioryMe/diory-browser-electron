import React from 'react'
import PropTypes from 'prop-types'

import TimelineView from '../timeline/TimelineView'
import MapView from '../map/MapView'
import { useFocusTool } from '../../tools/focus'

const useTools = () => {
  const focusDiory = useFocusTool()

  return {
    onClick: ({ diory }) => {
      focusDiory(diory)
    },
    onPopupClick: () => {},
    onMapClick: () => {},
    onDragEnd: () => {},
    enableDragging: () => {},
  }
}

const AllLens = ({ diory, diorys, activeButton }) => (
  <div height="100%">
    <div width="50%" height="100%">
      <MapView diory={diory} diorys={diorys} {...useTools()} activeButton={activeButton} />
    </div>
    <div>
      <TimelineView diory={diory} diorys={diorys} activeButton={activeButton} {...useTools()} />
    </div>
  </div>
)

AllLens.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
}

export default AllLens
