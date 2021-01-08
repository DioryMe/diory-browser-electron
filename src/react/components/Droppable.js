import React from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'

import { types } from './Draggable'

const Droppable = ({ type, style, isOverStyle, onDrop, children, ...props }) => {
  const [{ isOver }, drop] = useDrop({
    accept: types[type],
    drop: (item, monitor) => (monitor.isOver({ shallow: true }) ? onDrop(item) : undefined),
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  })

  return (
    <div {...props} ref={drop} style={{ ...style, ...(isOver && isOverStyle) }}>
      {children}
    </div>
  )
}

Droppable.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
  isOverStyle: PropTypes.object,
  onDrop: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Droppable
