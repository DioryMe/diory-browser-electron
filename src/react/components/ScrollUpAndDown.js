import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from 'ui-box'
import Icon from './Icon'

function scrollIntoView(elementRef) {
  elementRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const useScroll = (initialRef, scrolledRef, initialDirection) => {
  const [direction, setDirection] = useState(initialDirection)

  return {
    direction,
    onClick: () => {
      direction === initialDirection ? scrollIntoView(scrolledRef) : scrollIntoView(initialRef)
      setDirection(direction === 'up' ? 'down' : 'up')
    },
  }
}

const ScrollUpAndDown = ({ initialRef, scrolledRef, initialDirection, ...props }) => {
  const { direction, onClick } = useScroll(initialRef, scrolledRef, initialDirection)
  return (
    <Box
      data-testid={`navigate-${direction}`}
      onClick={onClick}
      style={{
        position: 'fixed',
        zIndex: 15,
        left: '50%',
        transform: 'translate(-50%, 0)',
        height: 50,
        width: 50,
        cursor: 'pointer',
      }}
      {...props}
    >
      <Icon icon={`chevron-${direction}`} color="disabled" size={48} />
    </Box>
  )
}

ScrollUpAndDown.propTypes = {
  initialRef: PropTypes.node.isRequired,
  scrolledRef: PropTypes.node.isRequired,
  initialDirection: PropTypes.string.isRequired,
}

export default ScrollUpAndDown
