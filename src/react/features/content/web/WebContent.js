import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { getUrl } from '../contentUtils'

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.5)',
  width: '150%',
  height: '150%',
}

const WebContent = ({ diory }) => {
  const webUrl = getUrl(diory)

  return (
    <Pane style={centerStyle}>
      <iframe title="web-browser" src={webUrl} height="100%" width="100%" />
    </Pane>
  )
}

WebContent.propTypes = {
  diory: PropTypes.object,
}

export default WebContent
