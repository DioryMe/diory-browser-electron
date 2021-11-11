import React from 'react'

import { useDiograph } from '../../diograph/useDiograph'
import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'
import { useUpdateTool } from '../../tools/update'

import TimelineView from './TimelineView'

import { withLensContainer } from '../LensContainer'

import button from './diory'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  return {
    onPopupClick: (diory) => {
      focusDiory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onMapClick: useCreateTool(),
    onDragEnd: useMoveTool(),
    enableDragging: useMoveToolIsActive(),
  }
}

const TimelineLens = () => <TimelineView {...useDiograph()} {...useTools()} />

export default withLensContainer('timeline', button)(TimelineLens)
