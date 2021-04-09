import React from 'react'
import Diory from './Diory'

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  lineHeight: 1.5,
}

function getAttributes({ data = [] }) {
  return data.map((attrs) => Object.entries(attrs).map(([key, value]) => `${key}:${value}`)).flat()
}

const DataAttributeDiory = (props) => {
  const attributes = getAttributes(props.diory)
  return (
    <Diory data-testid="ExerciseDiory" {...props}>
      <div style={centerStyle}>
        {attributes.map((attr) => (
          <div>{attr}</div>
        ))}
      </div>
    </Diory>
  )
}

export default DataAttributeDiory
