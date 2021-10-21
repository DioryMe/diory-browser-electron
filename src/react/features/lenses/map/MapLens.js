import React from 'react'

import { useLens } from '../useLens'
import { useFocusTool } from '../../tools/focus'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'

import { useMapFilter } from '../../filters/map/useMapFilter'

import MapView from './MapView'

import { withLensContainer } from '../LensContainer'

import button from './diory'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const { active, onBoundsChange } = useMapFilter()
  return {
    onPopupClick: (diory) => {
      focusDiory(diory)
      deleteDiory(diory)
    },
    onMapClick: useCreateTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
    fitToBounds: !active,
    onBoundsChange,
  }
}

const MapLens = () => <MapView {...useLens()} {...useTools()} />

export default withLensContainer('map', button)(MapLens)
