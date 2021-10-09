import PropTypes from 'prop-types'
import React from 'react'

import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'
import { useUpdateTool } from '../../tools/update'
import { useTimelineFilter } from '../../filters/timeline/useTimelineFilter'

import TimelineView from './TimelineView'
import { useLens } from '../useLens'

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

const TimelineLens = () => {
  const { diory, diorys } = useLens()
  return <TimelineView diory={diory} diorys={diorys} {...useToolActions()} />
}

TimelineLens.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
}

export default TimelineLens
