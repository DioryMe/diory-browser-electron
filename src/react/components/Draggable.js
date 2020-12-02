import React from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'

const Draggable = ({ id, type, children }) => {
  const [, drag] = useDrag({
    item: { type, id },
  })

  return (
    <div
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
  children: PropTypes.node,
}

export default Draggable
