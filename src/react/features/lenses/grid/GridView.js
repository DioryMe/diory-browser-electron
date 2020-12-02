import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Diory from '../../../components/diories/Diory'
import Draggable from '../../../components/Draggable'
import Droppable from '../../../components/Droppable'

const GridView = ({ diory, diorys, onDrop, onClick }) => (
  <Droppable
    isOverStyle={{ backgroundColor: 'yellow' }}
    accept="DIORY"
    style={{ position: 'absolute', width: '100%' }}
    onDrop={({ id }) => onDrop({ diory, link: { id } })}
  >
    <BackgroundDiory diory={diory} gradient onClick={onClick}>
      {diorys.map((linkDiory) => (
        <Box flex="1 0 360px" height={240} padding={24} alignSelf="center">
          <Droppable
            isOverStyle={{ opacity: 0.5 }}
            accept="DIORY"
            onDrop={({ id }) => onDrop({ diory: linkDiory, link: { id } })}
          >
            <Draggable type="DIORY" id={linkDiory.id}>
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
}

GridView.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}

export default GridView
