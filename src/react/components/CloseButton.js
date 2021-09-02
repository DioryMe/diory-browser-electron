import React from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'

const CloseButton = ({ onClick }) => (
  <div
    data-testid="close-button"
    onClick={onClick}
    style={{
      position: 'fixed',
      zIndex: 15,
      height: 36,
      width: 36,
      cursor: 'pointer',
      top: 0,
      right: 0,
      padding: 10,
    }}
  >
    <Icon icon="cross" color="disabled" size={36} />
  </div>
)

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CloseButton
