import React from 'react'

import { useStoryTool } from '../../tools/story'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'
import { useDiories } from '../../diograph/utils/useDiories'

import MapView from './MapView'

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

export const MapLens = () => {
  const diograph = useDiories()
  const tools = useMapTools()
  return <MapView {...diograph} {...tools} />
}
