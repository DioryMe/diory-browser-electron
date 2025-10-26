import React from 'react'

import { useStoryDiories } from '../../diograph/utils/useDiories'
import { useSelectStory } from '../../tools/selectStory'
import { useSelectDiory } from '../../tools/useSelectDiory'
import { useMoveTool, useMoveToolIsActive } from '../../tools/moveLocation'
import { useAddLocationTool } from '../../tools/addLocation'
import { useSelectedDiories } from '../../tools/useSelectedDiories'

import MapView from './MapView'

import mapLensButton from './button'

export { mapLensButton }

// TODO Zoom level to lngLatZoom
// TODO Group
// TODO Add place
// TODO show stories on map (without impact to view)
// TODO show parent on map (without impact on view)
// TODO fix move story location
export const MapLens = () => {
  const { story, memories } = useStoryDiories()
  const { mapSelectedDiory } = useSelectedDiories()

  return <MapView
    story={story}
    memories={memories.map(mapSelectedDiory)}
    onPopupClick={useSelectStory()}
    onSelect={useSelectDiory()}
    onMapClick={useAddLocationTool()}
    onDragEnd={useMoveTool()}
    enableDragging={useMoveToolIsActive()}
  />
}
