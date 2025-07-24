import React from 'react'

import { useCreateHomeDiory } from '../../home/utils/useCreateHomeDiory'
import { useLensButton } from '../utils/useLensButton'
import { useLens } from '../useLens'

import { useStoryDiories } from '../../diograph/utils/useDiories'
import { useSelectStory } from '../../tools/selectStory'
import { useSelectDiory } from '../../tools/useSelectDiory'
import { useMoveTool, useMoveToolIsActive } from '../../tools/moveLocation'
import { useAddLocationTool } from '../../tools/addLocation'

import MapView from './MapView'

import mapLensButton from './button'

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
  useCreateHomeDiory('map')
  useLensButton(mapLensButton)

  const diograph = useStoryDiories()
  const tools = useMapTools()

  return useLens('map')? <MapView {...diograph} {...tools} /> : null
}
