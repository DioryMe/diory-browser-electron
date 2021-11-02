import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'

const DragDropBackground = forwardRef(({ diory, onDrop, children, ...props }, ref) => (
  <Box ref={ref} height="100%" {...props}>
    <Droppable
      type={types.DIORY}
      style={{ height: '100%' }}
      isOverStyle={{ backgroundColor: 'white', opacity: 0.5 }}
      onDrop={({ id }) => onDrop({ droppedId: diory.id, draggedId: id })}
    >
      <Draggable id={diory.id} type={types.DIORY}>
        {children}
      </Draggable>
    </Droppable>
  </Box>
))

DragDropBackground.propTypes = {
  diory: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  children: PropTypes.node,
}

export default DragDropBackground
