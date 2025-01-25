import React from 'react'

import { useStoryTool } from '../diory/tools/story'
import { useCreateTool } from '../diory/tools/createLocation'
import { useDeleteTool } from '../diory/tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../diory/tools/move'

import MapView from '../../components/lenses/map/MapView'

import { withLensContainer } from './withLensContainer'

import button from '../../components/lenses/map/diory'

const useMapTools = () => {
  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  return {
    onPopupClick: (diory) => {
      selectStory(diory)
      deleteDiory(diory)
    },
    onMapClick: useCreateTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
  }
}

const MapLens = (diograph) => <MapView {...diograph} {...useMapTools()} />

export default withLensContainer('map', button)(MapLens)
