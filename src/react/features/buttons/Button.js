import React from 'react'
import PropTypes from 'prop-types'

import { IconButton } from 'evergreen-ui'

const getActiveProps = (active) =>
  active && {
    appearance: 'primary',
    intent: 'success',
  }

const Button = ({ data, active, onClick }) => (
  <div data-testid={`${data.testid}-button${active ? '--active' : ''}`} onClick={onClick}>
    <IconButton
      {...getActiveProps(active)}
      icon={data.icon}
      iconSize={24}
      height={56}
      margin={8}
      borderRadius="50%"
    />
  </div>
)

Button.defaultProps = {
  data: {},
  active: false,
  onClick: () => {},
}

Button.propTypes = {
  data: PropTypes.object,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
