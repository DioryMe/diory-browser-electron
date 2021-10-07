import React from 'react'
import PropTypes from 'prop-types'

import { types } from '../../../components/Draggable'
import Droppable from '../../../components/Droppable'
import SearchResult from '../../search/SearchResult'

const handStyle = {
  height: '34%',
  width: '300px',
  position: 'fixed',
  zIndex: 15,
  bottom: 0,
  right: 0,
  overflowX: 'auto',
  background: 'rgba(200,200,200,0.5)',
}

const HandView = ({ diorys = [], onDrop, onClick, onDropToItem }) => (
  <Droppable
    type={types.DIORY}
    style={handStyle}
    isOverStyle={{ background: '#D4EEE2' }}
    onDrop={onDrop}
    data-testid="hand"
  >
    {diorys.map((diory) => (
      <SearchResult diory={diory} onClick={onClick} onDrop={onDropToItem} />
    ))}
    <br />
    <br />
    <br />
  </Droppable>
)

HandView.propTypes = {
  diorys: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDropToItem: PropTypes.func.isRequired,
}

export default HandView
