import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import DioryActions from './DioryActions'

const dioryActionsStyle = {
  backgroundColor: 'white',
  position: 'absolute',
  bottom: 2,
  right: 2,
  cursor: 'pointer',
}

const FocusContainer = ({ diory, onDrop, onClick, style, children, ...props }) => (
  <Box key={diory.id} {...style}>
    <Box style={{ position: 'relative', height: '100%' }}>
      {children}
      <DioryActions diory={diory} onClick={onClick} onDrop={onDrop} style={dioryActionsStyle} />
    </Box>
  </Box>
)

FocusContainer.propTypes = {
  diory: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node,
}

export default FocusContainer
