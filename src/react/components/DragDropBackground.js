import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'
import Diory from './diories/Diory'

const DragDropBackground = ({ diory, onDrop, ...props }) => (
  <Box {...props}>
    <Droppable
      type={types.DIORY}
      style={{ height: '100%' }}
      isOverStyle={{ backgroundColor: 'white', opacity: 0.5 }}
      onDrop={({ id }) => onDrop({ droppedId: diory.id, draggedId: id })}
    >
      <Draggable id={diory.id} type={types.DIORY}/>
    </Droppable>
  </Box>
)

DragDropBackground.propTypes = {
  diory: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  children: PropTypes.node,
}

export default DragDropBackground
