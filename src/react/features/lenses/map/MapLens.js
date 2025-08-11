import React from 'react'

import { useStoryDiories } from '../../diograph/utils/useDiories'
import { useSelectStory } from '../../tools/selectStory'
import { useSelectDiory } from '../../tools/useSelectDiory'
import { useMoveTool, useMoveToolIsActive } from '../../tools/moveLocation'
import { useAddLocationTool } from '../../tools/addLocation'

import MapView from './MapView'

import mapLensButton from './button'

export { mapLensButton }

const useMapTools = () => {
  const { selectStory } = useSelectStory()
  const { selectDiory } = useSelectDiory()

  return {
    onPopupClick: (diory) => {
      selectStory(diory)
      selectDiory(diory)
    },
    onMapClick: useAddLocationTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
  }
}

// TODO Zoom level to lngLatZoom
// TODO Group
// TODO Add place
export const MapLens = () => {
  const diograph = useStoryDiories()
  const tools = useMapTools()

  return <MapView {...diograph} {...tools} />
}
