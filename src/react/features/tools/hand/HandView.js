import React from 'react'
import PropTypes from 'prop-types'

import Diory from '../../../components/diories/Diory'
import Draggable, { types } from '../../../components/Draggable'
import Droppable from '../../../components/Droppable'

const handStyle = {
  position: 'fixed',
  zIndex: 15,
  bottom: 0,
  left: 0,
  right: 0,
  height: '80px',
  margin: 16,
  padding: '0 8px',
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

const HandBackground = () => <div style={{ padding: 0, width: '100%' }} />

const HandView = ({ diorys = [], onDrop, onClick }) => (
  <Droppable
    type={types.DIORY}
    style={handStyle}
    isOverStyle={{ background: '#D4EEE2' }}
    onDrop={onDrop}
    data-testid="hand"
  >
    <HandBackground />
    {diorys.map((diory) => (
      <div key={diory.id} style={itemStyle}>
        <div style={scaleStyle}>
          <Draggable type={types.DIORY} id={diory.id}>
            <Diory id={`hand-${diory.id}`} diory={diory} onClick={onClick} height="100%" />
          </Draggable>
        </div>
      </div>
    ))}
  </Droppable>
)

HandView.propTypes = {
  diorys: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  onClick: PropTypes.func,
}

export default HandView
