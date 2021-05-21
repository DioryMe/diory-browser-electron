import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import Draggable, { types } from './Draggable'
import Droppable from './Droppable'
import Icon from './Icon'
import { invokeChannel } from '../client/client'

const DioryActions = ({ diory, onDrop, onClick, style }) => {
  const showItemInFolder = () =>
    invokeChannel('openInFinder', diory.data && diory.data[0].contentUrl)
  return (
    <Box style={style}>
      {diory.data && diory.data[0].contentUrl && (
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
  )
}

DioryActions.propTypes = {
  diory: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  style: PropTypes.object,
}

export default DioryActions
