import React from 'react'

import { useCreateTool } from '../diory/tools/createLocation'
import { useDeleteTool } from '../diory/tools/delete'
import { useStoryTool } from '../diory/tools/story'
import { useMoveTool, useMoveToolIsActive } from '../diory/tools/move'
import { useUpdateTool } from '../diory/tools/update'

import TimelineView from '../../components/lenses/timeline/TimelineView'

import { withLensContainer } from './withLensContainer'

import button from '../../components/lenses/timeline/diory'

const useTimelineTools = () => {
  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  return {
    onPopupClick: (diory) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onMapClick: useCreateTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
  }
}

const TimelineLens = (diograph) => <TimelineView {...diograph} {...useTimelineTools()} />

export default withLensContainer('timeline', button)(TimelineLens)
