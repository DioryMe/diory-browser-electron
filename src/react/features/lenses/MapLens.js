import React from 'react'

import { useStoryTool } from '../tools/story'
import { useCreateTool } from '../tools/createLocation'
import { useDeleteTool } from '../tools/delete'
import { useMoveTool, useMoveToolIsActive } from '../tools/move'
import { useLens } from './useLens'
import { useDiograph } from '../diograph/useDiograph'

import MapView from '../../components/lenses/map/MapView'

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

export const MapLens = () => {
  const diograph = useDiograph()
  const { enabled } = useLens('map', button)
  const tools = useMapTools()
  return enabled ? <MapView {...diograph} {...tools} /> : null
}
