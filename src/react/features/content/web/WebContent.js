import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { useOpenInBrowser } from './useOpenInBrowser'

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.5)',
  width: '150%',
  height: '150%',
}

const WebContent = ({ url }) => {
  useOpenInBrowser(url)

  return (
    <Pane style={centerStyle}>
      <iframe title="web-browser" src={url} height="100%" width="100%" />
    </Pane>
  )
}

WebContent.propTypes = {
  url: PropTypes.string,
}

export default WebContent
