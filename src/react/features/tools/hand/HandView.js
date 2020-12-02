import React from 'react'
import PropTypes from 'prop-types'

import Diory from '../../../components/diories/Diory'
import Draggable, { types } from '../../../components/Draggable'
import Droppable from '../../../components/Droppable'

const handbarStyle = {
  position: 'fixed',
  zIndex: 15,
  bottom: 0,
  left: 0,
  right: 0,
  height: 'initial',
  margin: 16,
  marginLeft: 44,
  display: 'flex',
  overflowX: 'auto',
  flexDirection: 'row-reverse',
  background: 'rgba(200,200,200,0.5)',
}

const itemStyle = {
  height: '56px',
  width: '100px',
  padding: '0 8px',
  flexShrink: 0,
}

const scaleStyle = {
  transform: 'scale(0.5)',
  width: '200%',
  height: '200%',
  transformOrigin: 'top left',
}

const HandView = ({ diorys = [], onDrop }) => (
  <Droppable
    type={types.DIORY}
    style={handbarStyle}
    isOverStyle={{ background: 'grey' }}
    onDrop={onDrop}
  >
    <div style={{ ...itemStyle, width: '100%', marginLeft: -116 }} />
    {diorys.map((diory) => (
      <div key={diory.id} style={itemStyle}>
        <div style={scaleStyle}>
          <Draggable type={types.DIORY} id={diory.id}>
            <Diory diory={diory} height="100%" />
          </Draggable>
        </div>
      </div>
    ))}
  </Droppable>
)

HandView.propTypes = {
  diorys: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export default HandView
