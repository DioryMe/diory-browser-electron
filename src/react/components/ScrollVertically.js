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

const ScrollVertically = ({ initialRef, scrolledRef, initialDirection, ...props }) => {
  const { direction, onClick } = useScroll(initialRef, scrolledRef, initialDirection)
  return (
    <Box
      data-testid={`navigate-${direction}`}
      onClick={onClick}
      style={{
        position: 'absolute',
        zIndex: 15,
        left: '50%',
        transform: 'translate(-50%, 0)',
        height: 50,
        width: 50,
        cursor: 'pointer',
        opacity: '0.7',
      }}
      {...props}
    >
      <Icon icon={`chevron-${direction}`} color="white" size={48} />
    </Box>
  )
}

ScrollVertically.propTypes = {
  initialRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  scrolledRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  initialDirection: PropTypes.string.isRequired,
}

export default ScrollVertically
