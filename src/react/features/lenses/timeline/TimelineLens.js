import PropTypes from 'prop-types'
import React from 'react'

import { useCreateTool } from '../../tools/createLocation'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useMoveTool, useMoveToolIsActive } from '../../tools/move'
import { useUpdateTool } from '../../tools/update'

import TimelineView from './TimelineView'

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

const TimelineLens = ({ diory, diorys, activeButton }) => (
  <TimelineView diory={diory} diorys={diorys} activeButton={activeButton} {...useTools()} />
)

TimelineLens.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
}

export default TimelineLens
