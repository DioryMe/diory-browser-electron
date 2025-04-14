import React from 'react'

import { useCreateTool } from '../tools/createLocation'
import { useDeleteTool } from '../tools/delete'
import { useStoryTool } from '../tools/story'
import { useMoveTool, useMoveToolIsActive } from '../tools/move'
import { useUpdateTool } from '../tools/update'
import { useLens } from './useLens'
import { useDiograph } from '../diograph/useDiograph'

import TimelineView from '../../components/lenses/timeline/TimelineView'

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

// TODO: Diory grid
// timeline: {
//   2025:
//   2024:
//   2024-06:
//   2024-06-01

export const TimelineLens = () => {
  const diograph = useDiograph()
  const tools = useTimelineTools()
  const { enabled } = useLens('timeline', button)
  return enabled ? <TimelineView {...diograph} {...tools} /> : null
}
