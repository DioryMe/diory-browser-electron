import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'

const NavigationToSide = ({ left, right, onClick }) =>
  !onClick ? null : (
    <div
      data-testid={`navigate-${left ? 'left' : 'right'}`}
      onClick={onClick}
      style={{
        position: 'absolute',
        zIndex: 15,
        top: '50%',
        transform: 'translate(0, -50%)',
        height: 50,
        width: 50,
        cursor: 'pointer',
        left: left && 0,
        right: right && 0,
        opacity: '0.7',
      }}
    >
      <Icon icon={`chevron-${left ? 'left' : 'right'}`} color="disabled" size={48} />
    </div>
  )

NavigationToSide.defaultProps = {
  left: false,
  right: false,
}

NavigationToSide.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool,
  onClick: PropTypes.func,
}

export default NavigationToSide
