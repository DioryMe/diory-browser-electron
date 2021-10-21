import React from 'react'

import { useLens } from '../useLens'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'
import { useUpdateTool } from '../../tools/update'
import { useTimelineFilter } from '../../filters/timeline/useTimelineFilter'

import TimelineView from './TimelineView'

import { withLensContainer } from '../LensContainer'

import button from './diory'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  const { active, onBoundsChange } = useTimelineFilter()
  return {
    onPopupClick: (diory) => {
      focusDiory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onMapClick: useCreateTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
    fitToBounds: !active,
    onBoundsChange,
  }
}

const TimelineLens = () => <TimelineView {...useLens()} {...useTools()} />

export default withLensContainer('timeline', button)(TimelineLens)
