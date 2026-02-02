import React from 'react'
import { useSelector } from 'react-redux'

import { useOnSelectStory } from '../../tools/onSelectStory'
import { useOnSelectDiory } from '../../tools/onSelectDiory/useOnSelectDiory'
import { useMoveTool, useMoveToolIsActive } from '../../tools/actions/moveLocation'
import { useAddLocationTool } from '../../tools/actions/addLocation'
import { useMapSelectedDiory } from '../../tools/utils/useMapSelectedDiory'

import { getStoryDiories } from '../../diograph/utils/getStoryDiories'

import MapView from './components/MapView'

export const mapLensButton = {
  id: 'map',
  text: 'Map',
  icon: 'map',
}

// TODO Zoom level to lngLatZoom
// TODO Group
// TODO Add place
// TODO show stories on map (without impact to view)
// TODO show parent on map (without impact on view)
// TODO fix move story location
export const MapLens = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story, memories } = getStoryDiories(storyKey, diograph)

  const { mapSelectedDiory } = useMapSelectedDiory()
  return (
    <MapView
      story={story}
      memories={memories.map(mapSelectedDiory)}
      onPopupClick={useOnSelectStory()}
      onSelect={useOnSelectDiory()}
      onMapClick={useAddLocationTool()}
      onDragEnd={useMoveTool()}
      enableDragging={useMoveToolIsActive()}
    />
  )
}
