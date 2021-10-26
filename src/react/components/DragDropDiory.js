import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'
import Diory from './diories/Diory'

const DragDropDiory = ({ diory, onDrop, onClick, children, ...props }) => (
  <Box {...props}>
    <Droppable
      type={types.DIORY}
      style={{ height: '100%' }}
      isOverStyle={{ opacity: 0.5 }}
      onDrop={({ id }) => onDrop({ droppedId: diory.id, draggedId: id })}
    >
      <Draggable id={diory.id} type={types.DIORY}>
        <Diory diory={diory} onClick={onClick} elevation={2} aria-controls={`panel-${diory.id}`} />
      </Draggable>
    </Droppable>
  </Box>
)

DragDropDiory.propTypes = {
  diory: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  children: PropTypes.node,
}

export default DragDropDiory
