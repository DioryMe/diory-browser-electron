import React from 'react'
import PropTypes from 'prop-types'

import { useDispatchActions } from '../../../store'

import { addDioryToHand } from '../actions'

import Diory from '../../../components/diories/Diory'
import Draggable from '../../../components/Draggable'
import Droppable from '../../../components/Droppable'

const handbarStyle ={
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
  background: 'rgba(200,200,200,0.5)'
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

const HandView = ({ diorys = [] }) => {
  const { dispatch } = useDispatchActions()
  return (
    <Droppable
      style={handbarStyle}
      isOverStyle={{ background: 'yellow' }}
      accept="DIORY"
      onDrop={({ id }) => dispatch(addDioryToHand(id))}
    >
      <div style={{ ...itemStyle, width: '100%', marginLeft: -116 }}/>
      {diorys.map((diory) => (
        <div key={diory.id} style={itemStyle}>
          <div style={scaleStyle}>
            <Draggable type="DIORY" id={diory.id} >
              <Diory diory={diory} height="100%"/>
            </Draggable>
          </div>
        </div>
      ))}
    </Droppable>
  )
}

HandView.propTypes = {
  diorys: PropTypes.array.isRequired,
}

export default HandView
