import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'evergreen-ui'

const NavigationSideways = ({ left, right, onClick }) => (
  <div
    data-testid={`navigate-${left ? 'left' : 'right'}`}
    onClick={onClick}
    style={{
      position: 'fixed',
      zIndex: 15,
      top: '50%',
      transform: 'translate(0, -50%)',
      height: 50,
      width: 50,
      cursor: 'pointer',
      left: left && 0,
      right: right && 0,
    }}
  >
    <Icon icon={`chevron-${left ? 'left' : 'right'}`} color="disabled" size={48} />
  </div>
)

NavigationSideways.defaultProps = {
  left: false,
  right: false,
  onClick: () => {},
}

NavigationSideways.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool,
  onClick: PropTypes.func,
}

export default NavigationSideways
