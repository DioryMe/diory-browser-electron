import React from 'react'
import { Icon } from 'evergreen-ui'

const NavigationSideways = ({ left, right, onClick }) => (
  <div
    data-testid={`navigate-${left ? 'left' : 'right'}`}
    onClick={onClick}
    style={{
      position: 'fixed',
      zIndex: 1000,
      top: '50%',
      transform: 'translate(0, -50%)',
      height: 50,
      width: 50,
      cursor: 'pointer',
      left: left && 0,
      right: right && 0,
    }}
  >
    <Icon
      icon={`chevron-${left ? 'left' : 'right'}`}
      color="disabled"
      size={48}
    />
  </div>
)

export default NavigationSideways
