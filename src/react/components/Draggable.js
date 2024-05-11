import React from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'

export const types = {
  DIORY: 'DIORY',
}

const Draggable = ({ draggedDiory, type, children }) => {
  const [, drag] = useDrag({
    type: types[type],
    item: {
      draggedDiory,
    },
  })

  return (
    <div
      ref={drag}
      style={{
        height: 'inherit',
      }}
    >
      {children}
    </div>
  )
}

Draggable.propTypes = {
  draggedDiory: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Draggable
