import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import { Pane } from 'evergreen-ui'

const defaultStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundImage: 'linear-gradient(rgba(50,50,50), rgba(50,50,50),rgba(0,0,0))',
}

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.5)',
  width: '150%',
  height: '150%',
}

const WebPage = ({ address, ...props }) => (
  <Box {...defaultStyle} {...props}>
    <Pane style={centerStyle}>
      <iframe title="web-browser" src={address} height="100%" width="100%" />
    </Pane>
  </Box>
)

WebPage.propTypes = {
  address: PropTypes.string.isRequired,
}

export default WebPage
