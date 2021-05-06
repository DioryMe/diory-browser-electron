import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'
import { invokeChannel } from '../client/client'

const FocusDioryContainer = ({ diory, onDrop, onClick, children, ...props }) => {
  const showItemInFolder = () => invokeChannel('openInFinder', diory.data && diory.data.contentUrl)
  return (
    <Box key={diory.id} {...props}>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>{children}</div>
      <Droppable
        type={types.DIORY}
        style={{ height: '100%' }}
        isOverStyle={{ opacity: 0.5 }}
        onDrop={({ id }) => onDrop({ droppedId: diory.id, draggedId: id })}
      >
        <Draggable id={diory.id} type={types.DIORY}>
          <div onClick={() => onClick(diory)}>Handle</div>
          {diory.data && diory.data.contentUrl && (
            <button type="submit" onClick={showItemInFolder}>
              Show item in folder
            </button>
          )}
        </Draggable>
      </Droppable>
    </Box>
  )
}

FocusDioryContainer.propTypes = {
  diory: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  children: PropTypes.node,
}

export default FocusDioryContainer
