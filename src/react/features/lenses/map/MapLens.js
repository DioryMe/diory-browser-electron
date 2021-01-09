import React from 'react'
import PropTypes from 'prop-types'
import { useDispatchActions } from '../../../store'

import { useFocusTool } from '../../tools/focus'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'

import { setFilter } from '../../filters/actions'

import MapView from './MapView'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()

  const { dispatch } = useDispatchActions()
  return {
    onPopupClick: (diory) => {
      focusDiory(diory)
      deleteDiory(diory)
    },
    onMapClick: useCreateTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
    onBoundsChange: (bounds) => dispatch(setFilter({ map: bounds })),
  }
}

const MapLens = ({ diory, diorys }) => (
  <MapView diory={diory} diorys={diorys} {...useTools()} />
)

MapLens.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
}

export default MapLens
