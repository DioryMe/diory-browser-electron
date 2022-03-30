import React from 'react'
import PropTypes from 'prop-types'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'

const DragDrop = ({ id, onDrop, children }) => (
  <Droppable
    type={types.DIORY}
    style={{ height: '100%' }}
    isOverStyle={{ opacity: 0.5 }}
    onDrop={({ id: draggedId }) => onDrop({ droppedId: id, draggedId })}
  >
    <Draggable id={id} type={types.DIORY}>
      {children}
    </Draggable>
  </Droppable>
)

DragDrop.propTypes = {
  id: PropTypes.string.isRequired,
  onDrop: PropTypes.func,
  children: PropTypes.node,
}

export default DragDrop
