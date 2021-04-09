import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import Diory from '../../../components/diories/Diory'
import Draggable, { types } from '../../../components/Draggable'
import Droppable from '../../../components/Droppable'

const GridView = ({ diory, diorys, onDrop, onClick }) => (
  <Droppable
    type={types.DIORY}
    isOverStyle={{ backgroundColor: '#D4EEE2' }}
    onDrop={({ id }) => onDrop({ droppedId: diory.id, draggedId: id })}
  >
    <BackgroundDiory diory={{ image: diory.image }} gradient>
      <DataAwareDiory diory={diory} onClick={onClick} flex="1 0 100%" height={480} padding={24} />
      {diorys.map((linkDiory) => (
        <Box key={linkDiory.id} flex="1 0 360px" height={240} padding={24} alignSelf="center">
          <Droppable
            type={types.DIORY}
            style={{ height: '100%' }}
            isOverStyle={{ opacity: 0.5 }}
            onDrop={({ id }) => onDrop({ droppedId: linkDiory.id, draggedId: id })}
          >
            <Draggable id={linkDiory.id} type={types.DIORY}>
              <Diory
                key={linkDiory.id}
                diory={linkDiory}
                onClick={onClick}
                elevation={2}
                aria-controls={`panel-${linkDiory.id}`}
              />
            </Draggable>
          </Droppable>
        </Box>
      ))}
    </BackgroundDiory>
  </Droppable>
)

GridView.defaultProps = {
  onClick: () => {},
  onDrop: () => {},
}

GridView.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default GridView
