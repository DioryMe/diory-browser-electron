import React from 'react'

import { useFocusTool } from '../../tools/focus'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'

import MapView from './MapView'

const useTools = () => ({
  onPopupClick: useFocusTool(),
  onMapClick: useCreateTool(),
  onMarkerClick: useDeleteTool(),
  onDragEnd: useMoveTool(),
  enableDragging: useMoveToolIsActive(),
})

const MapLens = ({ diory, diorys, activeButton }) => (
  <MapView
    diory={diory}
    diorys={diorys}
    {...useTools()}
    activeButton={activeButton}
  />
)

export default MapLens
