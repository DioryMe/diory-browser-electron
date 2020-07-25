import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

const ButtonBarView = ({ buttons }) => (
  <div
    style={{
      position: 'fixed',
      zIndex: 15,
      bottom: 0,
      cursor: 'pointer',
      left: 0,
      padding: 8,
    }}
  >
    {buttons.map((button) => (
      <Button key={button.id} {...button} />
    ))}
  </div>
)

ButtonBarView.defaultProps = {
  buttons: [],
}

ButtonBarView.propTypes = {
  buttons: PropTypes.array,
}

export default ButtonBarView
