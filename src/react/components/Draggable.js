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
      id={id}
      ref={drag}
      style={{
        height: '100%',
      }}
    >
      {children}
    </div>
  )
}

Draggable.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Draggable
