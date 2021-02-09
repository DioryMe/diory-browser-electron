import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

const ZoomBar = ({ buttons }) => (
  <div
    style={{
      position: 'fixed',
      zIndex: 15,
      top: 48,
      cursor: 'pointer',
      right: 0,
      padding: 8,
    }}
  >
    {buttons.map((button) => (
      <Button
        key={button.id}
        style={{
          borderRadius: 0,
          iconSize: 16,
          height: 32,
          margin: 0,
          color: 'black',
        }}
        {...button}
      />
    ))}
  </div>
)

ZoomBar.defaultProps = {
  buttons: [],
}

ZoomBar.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
}

export default ZoomBar
