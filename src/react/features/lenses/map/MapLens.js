import React from 'react'

import { useDiograph } from '../../diograph/useDiograph'
import { useStoryTool } from '../../tools/story'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'

import MapView from './MapView'

import { withLensContainer } from '../withLensContainer'

import button from './diory'

const useTools = () => {
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

const MapLens = () => <MapView {...useDiograph()} {...useTools()} />

export default withLensContainer('map', button)(MapLens)
