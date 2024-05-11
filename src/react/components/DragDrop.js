import React from 'react'
import PropTypes from 'prop-types'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'

const DragDrop = ({ diory, onDrop, children }) => (
  <Droppable
    type={types.DIORY}
    style={{ height: '100%' }}
    isOverStyle={{ backgroundColor: 'white', opacity: 0.5 }}
    onDrop={({ draggedDiory }) => onDrop({ diory, draggedDiory })}
  >
    <Draggable draggedDiory={diory} type={types.DIORY}>
      {children}
    </Draggable>
  </Droppable>
)

DragDrop.propTypes = {
  diory: PropTypes.object.isRequired,
  onDrop: PropTypes.func,
  children: PropTypes.node,
}

export default DragDrop
