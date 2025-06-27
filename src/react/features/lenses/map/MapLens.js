import React from 'react'

import { useStoryTool } from '../../tools/story'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'
import { useDiories } from '../../diograph/utils/useDiories'

import MapView from './MapView'
import { useAddLocationTool } from '../../tools/addLocation'
import { useUpdateTool } from '../../tools/update'

const useMapTools = () => {
  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()

  return {
    onPopupClick: (diory) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onMapClick: useAddLocationTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
  }
}

export const MapLens = () => {
  const diograph = useDiories()
  const tools = useMapTools()
  return <MapView {...diograph} {...tools} />
}
