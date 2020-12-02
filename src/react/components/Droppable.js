import React from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'

const Droppable = ({ accept, style, isOverStyle, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept,
    drop: (item, monitor) => (monitor.isOver({ shallow: true }) ? onDrop(item) : undefined),
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  })

  return (
    <div ref={drop} style={{ height: '100%', ...style, ...(isOver && isOverStyle) }}>
      {children}
    </div>
  )
}

Droppable.propTypes = {
  children: PropTypes.node,
}

export default Droppable
