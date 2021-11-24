import React from 'react'
import PropTypes from 'prop-types'

import Diory from '../../components/diories/Diory'
import Draggable, { types } from '../../components/Draggable'
import Droppable from '../../components/Droppable'

const itemStyle = {
  height: '56px',
}

const scaleStyle = {
  transform: 'scale(0.8)',
  width: '125%',
  height: '125%',
  transformOrigin: 'top left',
}

const SearchResult = ({ diory, onClick, onDrop }) => (
  <Droppable
    type={types.DIORY}
    style={itemStyle}
    isOverStyle={{ opacity: 0.5 }}
    onClick={() => onClick(diory.id)}
    onDrop={({ id }) => onDrop({ droppedId: diory.id, draggedId: id })}
  >
    <div style={scaleStyle}>
      <Draggable type={types.DIORY} id={diory.id}>
        <Diory id={`search-${diory.id}`} diory={diory} />
      </Draggable>
    </div>
  </Droppable>
)

SearchResult.propTypes = {
  diory: PropTypes.object,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default SearchResult
