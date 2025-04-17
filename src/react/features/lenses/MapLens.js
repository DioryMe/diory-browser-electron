import React from 'react'

import { useStoryTool } from '../tools/story'
import { useCreateTool } from '../tools/createLocation'
import { useDeleteTool } from '../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../tools/move'
import { useLens } from './utils/useLens'
import { useDiograph } from '../diograph/useDiograph'

import MapView from './components/map/MapView'

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

const MapWithTools = () => {
  const diograph = useDiograph()
  const tools = useMapTools()
  return <MapView {...diograph} {...tools} />
}

export const MapLens = () => {
  const { enabled } = useLens('map')
  return enabled ? <MapWithTools /> : null
}
