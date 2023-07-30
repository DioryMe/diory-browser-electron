import React from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'

export const types = {
  DIORY: 'DIORY',
}

const Draggable = ({ id, type, children }) => {
  const [, drag] = useDrag({
    type: types[type],
    item: {
      id,
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
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Draggable
