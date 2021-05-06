import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'
import Icon from './Icon'
import { invokeChannel } from '../client/client'

const defaultStyle = { backgroundColor: 'white', position: 'absolute', bottom: 2, right: 2 }

const FocusDioryContainer = ({ diory, onDrop, onClick, style, children, ...props }) => {
  const showItemInFolder = () => invokeChannel('openInFinder', diory.data && diory.data.contentUrl)
  return (
    <Box key={diory.id} {...style}>
      <Box style={{ position: 'relative', height: '100%' }}>
        {children}
        <Box style={defaultStyle}>
          {diory.data && diory.data.contentUrl && (
            <Box type="submit" onClick={showItemInFolder} marginBottom={4}>
              <Icon size={32} icon="folder" marginLeft={4} marginRight={4} />
            </Box>
          )}
          <Droppable
            type={types.DIORY}
            style={{ height: '100%' }}
            isOverStyle={{ opacity: 0.5 }}
            onDrop={({ id }) => onDrop({ droppedId: diory.id, draggedId: id })}
          >
            <Draggable id={diory.id} type={types.DIORY}>
              <Box onClick={() => onClick({ diory })}>
                <Icon size={32} icon="hand" marginLeft={4} />
              </Box>
            </Draggable>
          </Droppable>
        </Box>
      </Box>
    </Box>
  )
}

FocusDioryContainer.propTypes = {
  diory: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node,
}

export default FocusDioryContainer
