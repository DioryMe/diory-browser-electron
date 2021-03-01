import React from 'react'

import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'
import { useUpdateTool } from '../../tools/update'
import { useTimelineFilter } from '../../filters/timeline/useTimelineFilter'

import LensContainer from '../components/LensContainer'
import { useLensDiorys } from '../hooks/useLens'
import TimelineView from './TimelineView'

const TIMELINE_LENS_ID = 'timeline'

const timelineDiory = {
  id: TIMELINE_LENS_ID,
  text: 'Timeline',
  image: 'time',
}

const useToolActions = () => {
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

const SelectedTimelineLens = () => {
  const { diory, diorys } = useLensDiorys()
  return <TimelineView diory={diory} diorys={diorys} {...useToolActions()} />
}

const TimelineLens = () => (
  <LensContainer lensDiory={timelineDiory}>
    <SelectedTimelineLens />
  </LensContainer>
)

export default TimelineLens
