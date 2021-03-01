import React from 'react'

import { useFocusTool } from '../../tools/focus'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'
import { useMapFilter } from '../../filters/map/useMapFilter'

import LensContainer from '../components/LensContainer'
import { useLensDiorys } from '../hooks/useLens'
import MapView from './MapView'

const MAP_LENS_ID = 'map'

const mapDiory = {
  id: MAP_LENS_ID,
  text: 'Map',
  image: 'map',
}

const useToolActions = () => {
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

const SelectedMapLens = () => {
  const { diory, diorys } = useLensDiorys()
  return <MapView diory={diory} diorys={diorys} {...useToolActions()} />
}

const MapLens = () => (
  <LensContainer lensDiory={mapDiory}>
    <SelectedMapLens />
  </LensContainer>
)

export default MapLens
