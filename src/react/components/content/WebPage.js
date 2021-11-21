import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.5)',
  width: '150%',
  height: '150%',
}

const WebPage = ({ address, ...props }) => (
  <Pane style={centerStyle}>
    <iframe title="web-browser" src={address} height="100%" width="100%" />
  </Pane>
)

WebPage.propTypes = {
  address: PropTypes.string.isRequired,
}

export default WebPage
