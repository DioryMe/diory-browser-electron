import React from 'react'
import PropTypes from 'prop-types'

import Diory from '../../components/diories/Diory'
import Draggable, { types } from '../../components/Draggable'

const itemStyle = {
  height: '56px',
  width: '200px',
  padding: '0 8px',
  flexShrink: 0,
}

const scaleStyle = {
  transform: 'scale(0.5)',
  width: '200%',
  height: '200%',
  transformOrigin: 'top left',
}

const SearchResult = ({ diory, onClick }) => (
  <div key={diory.id} style={itemStyle} onClick={() => onClick(diory.id)}>
    <div style={scaleStyle}>
      <Draggable type={types.DIORY} id={diory.id}>
        <Diory id={`search-${diory.id}`} diory={diory} height="50px" />
      </Draggable>
    </div>
  </div>
)

SearchResult.propTypes = {
  diory: PropTypes.object,
  onClick: PropTypes.func,
}

export default SearchResult
