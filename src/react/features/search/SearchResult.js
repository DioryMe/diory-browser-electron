import React from 'react'
import PropTypes from 'prop-types'

import Diory from '../../components/diories/Diory'
import Draggable, { types } from '../../components/Draggable'
import Droppable from '../../components/Droppable'

const itemStyle = {
  height: '56px',
  width: '150px',
  padding: '0 8px',
  flexShrink: 0,
}

const scaleStyle = {
  transform: 'scale(0.9)',
  width: '200%',
  height: '100%',
  transformOrigin: 'top left',
}

const SearchResult = ({ diory, onClick, onDrop }) => (
  <div key={diory.id} style={itemStyle} onClick={() => onClick(diory.id)}>
    <div style={scaleStyle}>
      <Droppable
        type={types.DIORY}
        style={{ height: '100%' }}
        isOverStyle={{ opacity: 0.5 }}
        onDrop={({ id }) => onDrop({ droppedId: diory.id, draggedId: id })}
      >
        <Draggable type={types.DIORY} id={diory.id}>
          <Diory id={`search-${diory.id}`} diory={diory} height="50px" />
        </Draggable>
      </Droppable>
    </div>
  </div>
)

SearchResult.propTypes = {
  diory: PropTypes.object,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default SearchResult
