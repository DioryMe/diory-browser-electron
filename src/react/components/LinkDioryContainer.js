import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'

const LinkDioryContainer = ({ linkDiory, onDrop, onClick, style, children }) => (
  <Box key={linkDiory.id} flex="1 0 360px" height={240} padding={24} alignSelf="center" {...style}>
    <Droppable
      type={types.DIORY}
      style={{ position: 'relative', height: '100%' }}
      isOverStyle={{ opacity: 0.5 }}
      onDrop={({ id }) => onDrop({ droppedId: linkDiory.id, draggedId: id })}
    >
      <Draggable id={linkDiory.id} type={types.DIORY}>
        {children}
      </Draggable>
    </Droppable>
  </Box>
)

LinkDioryContainer.propTypes = {
  linkDiory: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node,
}

export default LinkDioryContainer
