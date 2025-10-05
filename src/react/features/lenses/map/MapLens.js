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
// TODO show stories on map (without impact to view)
// TODO show parent on map (without impact on view)
// TODO fix move story location
export const MapLens = () => {
  const diograph = useStoryDiories()
  const tools = useMapTools()

  return <MapView {...diograph} {...tools} />
}
