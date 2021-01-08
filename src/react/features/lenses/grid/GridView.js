import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Diory from '../../../components/diories/Diory'
import Draggable, { types } from '../../../components/Draggable'
import Droppable from '../../../components/Droppable'

const GridView = ({ diory, diorys, onDrop, onClick }) => (
  <Droppable
    type={types.DIORY}
    style={{ position: 'absolute', width: '100%' }}
    isOverStyle={{ backgroundColor: '#E4E7EB' }}
    onDrop={({ id }) => onDrop({ focus: diory, link: { id } })}
  >
    <BackgroundDiory diory={diory} gradient onClick={onClick}>
      {diorys.map((linkDiory) => (
        <Box flex="1 0 360px" height={240} padding={24} alignSelf="center">
          <Droppable
            type={types.DIORY}
            isOverStyle={{ opacity: 0.5 }}
            onDrop={({ id }) => onDrop({ focus: linkDiory, link: { id } })}
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
