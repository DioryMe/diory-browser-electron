import React from 'react'
import PropTypes from 'prop-types'

import { useFocusTool } from '../../tools/focus'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'

import MapView from './MapView'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  return {
    onPopupClick: (diory) => {
      focusDiory(diory)
      deleteDiory(diory)
    },
    onMapClick: useCreateTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
  }
}

const MapLens = ({ diory, diorys, activeButton }) => (
  <MapView diory={diory} diorys={diorys} {...useTools()} activeButton={activeButton} />
)

MapLens.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
}

export default MapLens
