import React from 'react'
import PropTypes from 'prop-types'

import { useFocusTool } from '../../tools/focus'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'

import { useMapFilter } from '../../filters/map/useMapFilter'

import MapView from './MapView'

const useToolActions = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const { isActive, onBoundsChange } = useMapFilter()
  return {
    onPopupClick: (diory) => {
      focusDiory(diory)
      deleteDiory(diory)
    },
    onMapClick: useCreateTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
    fitToBounds: !isActive,
    onBoundsChange,
  }
}

const MapLens = ({ diory, diorys }) => (
  <MapView diory={diory} diorys={diorys} {...useToolActions()} />
)

MapLens.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
}

export default MapLens
